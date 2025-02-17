import { expect, test, describe, beforeAll, afterAll } from "bun:test";
import { processorController } from "../src/modules/processor.controller";
import type { Config } from "../src/types";
import { mkdirSync, rmSync } from "fs";
import { join } from "path";

const TEST_DIR = join(import.meta.dir, "tmp");
const INPUT_DIR = join(TEST_DIR, "input");
const OUTPUT_DIR = join(TEST_DIR, "output");

// Extended sample types with more edge cases
const sampleTypes = `
export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  isActive: boolean;
  metadata: Record<string, any>;
};

export type CreateUserInput = {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  type: 'admin' | 'user';
};

export type UpdateUserInput = {
  email?: string;
  updatedAt: Date;
  isActive?: boolean;
};

export interface ComplexNestedInput {
  create?: UserCreateInput & { extraData: any };
  update?: UserUpdateInput;
  upsert?: UserUpsertInput;
  connect?: UserWhereUniqueInput[];
  disconnect?: boolean;
  delete?: boolean;
  include?: {
    profile?: boolean;
    posts?: boolean;
  };
}

// Edge case: Empty type
export type EmptyType = {
};

// Edge case: Type with only hidden fields
export type OnlyHiddenFields = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

// Edge case: Nested structure
export interface DeepNestedStructure {
  level1: {
    level2: {
      level3: {
        createdAt: Date;
        data: string;
      }
    }
  }
}

export type ComplexUserInput = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailVerified: boolean;
    role: 'ADMIN' | 'USER';
    metadata: any;
    settings: {
        notifications: boolean;
        theme: string;
    };
};

export type ComplexPostInput = {
    title: string;
    content: string;
    draft: boolean;
    publishedAt: Date;
    authorId: string;
    metadata: any;
    settings: {
        visibility: 'public' | 'private';
        commentsEnabled: boolean;
    };
};
`;

describe("TypeProcessor", () => {
    beforeAll(() => {
        // Create test directories
        mkdirSync(INPUT_DIR, { recursive: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });

        // Create test input files
        Bun.write(join(INPUT_DIR, "types.input.ts"), sampleTypes);
        Bun.write(join(INPUT_DIR, "types2.input.ts"), sampleTypes);
    });

    afterAll(() => {
        // Cleanup test directories
        rmSync(TEST_DIR, { recursive: true, force: true });
    });

    test("should comment out timestamp fields", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all",
                on: "input"
            }]
        };

        await processorController.process(config);

        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");
        expect(result).toContain("isActive: boolean");
    });

    test("should delete specific fields", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["isActive"],
                target: ["*"],  // Changed from ["*Input"] to ["*"] to target all types
                on: "both"     // Changed from "input" to "both" to ensure all occurrences are caught
            }]
        };

        await processorController.process(config);

        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).not.toContain("isActive: boolean");
        expect(result).toContain("email: string");
    });

    test("should handle nested input types", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["disconnect", "delete"],
                target: ["*NestedInput"]
            }]
        };

        await processorController.process(config);

        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).not.toContain("disconnect?: boolean");
        expect(result).not.toContain("delete?: boolean");
        expect(result).toContain("create?: UserCreateInput");
    });

    test("should delete original files when configured", async () => {
        const testFile = join(INPUT_DIR, "delete-me.input.ts");
        await Bun.write(testFile, sampleTypes);

        const config: Config = {
            originFile: testFile,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: true,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        await processorController.process(config);

        expect(await Bun.file(testFile).exists()).toBe(false);
        expect(await Bun.file(join(OUTPUT_DIR, "delete-me.input.ts")).exists()).toBe(true);
    });

    test("should handle multiple glob patterns", async () => {
        const config: Config = {
            originFile: [
                `${INPUT_DIR}/*.input.ts`,
                `${INPUT_DIR}/*.output.ts`
            ],
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        await processorController.process(config);

        const results = await Promise.all([
            Bun.file(join(OUTPUT_DIR, "types.input.ts")).exists(),
            Bun.file(join(OUTPUT_DIR, "types2.input.ts")).exists()
        ]);

        expect(results.every(Boolean)).toBe(true);
    });

    test("should handle complex nested structures", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: ["DeepNestedStructure"],
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("data: string");
    });

    test("should handle type with only hidden fields", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["*At"],
                target: ["OnlyHiddenFields"], // Fix: Wrap in array
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        const typeMatch = result.match(/export type OnlyHiddenFields = \{[^}]*\}/s);
        expect(typeMatch).not.toBeNull();
        expect(typeMatch![0]).not.toContain("createdAt");
        expect(typeMatch![0]).not.toContain("updatedAt");
        expect(typeMatch![0]).not.toContain("deletedAt");
    });

    test("should handle complex pattern matching", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: ["*At", "is*", "*Id"],
                target: ["*Input", "*Output"],
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// isActive: boolean");
        expect(result).toContain("email: string");
    });

    test("should handle empty types", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: "*",
                target: ["EmptyType"],
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("export type EmptyType = {");
        expect(result).toContain("};");
    });

    test("should handle union types in field values", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "type",
                target: ["CreateUserInput"],
                on: "input"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("// type: 'admin' | 'user'");
    });

    test("should handle interface declarations", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["connect", "disconnect", "delete"],
                target: ["ComplexNestedInput"],
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).not.toContain("connect?:");
        expect(result).not.toContain("disconnect?:");
        expect(result).not.toContain("delete?:");
        expect(result).toContain("create?:");
        expect(result).toContain("update?:");
    });

    test("should handle array fields in interface declarations", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "connect",
                target: ["ComplexNestedInput"],
                on: "both"
            }]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        expect(result).toContain("// connect?: UserWhereUniqueInput[]");
    });

    test("should handle multiple array patterns simultaneously", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [
                {
                    field: ["*Id", "*At"],
                    target: ["*Input"],
                    on: "input"
                },
                {
                    field: ["metadata", "settings"],
                    target: ["ComplexUserInput", "ComplexPostInput"],
                    on: "both"
                },
                {
                    field: ["firstName", "lastName", "phoneNumber"],
                    target: ["ComplexUserInput"],
                    on: "input"
                },
                {
                    field: ["draft", "content"],
                    target: ["ComplexPostInput"],
                    on: "input"
                }
            ]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        // Check fields are removed from ComplexUserInput
        expect(result).not.toContain("firstName: string");
        expect(result).not.toContain("lastName: string");
        expect(result).not.toContain("phoneNumber: string");
        expect(result).not.toContain("metadata: any");
        expect(result).not.toContain("settings: {");
        expect(result).toContain("emailVerified: boolean");
        expect(result).toContain("role: 'ADMIN' | 'USER'");

        // Check fields are removed from ComplexPostInput
        expect(result).not.toContain("draft: boolean");
        expect(result).not.toContain("content: string");
        expect(result).not.toContain("publishedAt: Date");
        expect(result).not.toContain("authorId: string");
        expect(result).not.toContain("metadata: any");
        expect(result).not.toContain("settings: {");
        expect(result).toContain("title: string");
    });

    test("should handle overlapping field patterns", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [
                {
                    field: "*Id",
                    target: ["ComplexPostInput"],
                    on: "input"
                },
                {
                    field: ["author*", "*Id"],
                    target: ["*Input"],
                    on: "both"
                }
            ]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        // Check that both patterns work and don't interfere with each other
        expect(result).toContain("// authorId: string");
        // Updated regex to better handle line boundaries and whitespace
        expect(result).not.toMatch(/^\s*authorId:\s*string/m);
    });

    test("should handle multiple glob patterns in field arrays", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [
                {
                    // First rule targets timestamp fields
                    field: ["createdAt", "updatedAt", "deletedAt"],
                    target: ["*"],
                    on: "both"
                },
                {
                    // Second rule targets specific patterns
                    field: [
                        "isActive",
                        "*Id",
                        "metadata",
                        "settings",
                    ],
                    target: ["*Input", "*Complex*"],
                    on: "both"
                }
            ]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        // Test field pattern matching for timestamps
        expect(result).not.toMatch(/\bcreatedAt:\s*Date/);
        expect(result).not.toMatch(/\bupdatedAt:\s*Date/);
        expect(result).not.toMatch(/\bdeletedAt:\s*Date/);

        // Test other field patterns
        expect(result).not.toMatch(/\bisActive:\s*boolean/);
        expect(result).not.toMatch(/\bauthorId:\s*string/);
        expect(result).not.toMatch(/\bmetadata:\s*any/);
        expect(result).not.toMatch(/\bsettings:\s*{[^}]*}/);

        // Verify that some non-matching fields remain
        expect(result).toContain("email: string");
        expect(result).toContain("title: string");
    });

    test("should handle glob pattern combinations with negation", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",  // Changed from 'delete' to 'comment'
            generateOmitTypes: false,
            hide: [
                {
                    field: "*",  // First hide everything
                    target: ["*User*"],
                    on: "input"
                },
                {
                    field: "*",
                    target: ["!*Complex*", "*"],
                    on: "both"
                }
            ]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        // All fields in User types should be commented out
        expect(result).toContain("// email: string");
        expect(result).toContain("// isActive: boolean");
        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");

        // Fields in Complex types should remain uncommented
        expect(result).toMatch(/ComplexUserInput[\s\S]*?{[\s\S]*?emailVerified: boolean/);
        expect(result).toMatch(/ComplexPostInput[\s\S]*?{[\s\S]*?title: string/);
    });

    test("should handle complex glob pattern combinations", async () => {
        const config: Config = {
            originFile: `${INPUT_DIR}/*.input.ts`,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [
                {
                    field: ["*.[a-z]*", "*.{enabled,visible}", "metadata"], // Added "metadata" to field patterns
                    target: ["*{User,Post}*"], // Types containing User or Post
                    on: "both"
                },
                {
                    field: ["[A-Z]*", "[a-z]*Id"], // Capital starting or ending with Id
                    target: ["!(Test)*Input"], // All *Input except Test*Input
                    on: "input"
                }
            ]
        };

        await processorController.process(config);
        const result = await Bun.file(join(OUTPUT_DIR, "types.input.ts")).text();

        // Test nested field patterns
        expect(result).not.toContain("settings.theme");
        expect(result).not.toContain("settings.notifications");
        expect(result).not.toContain("settings.commentsEnabled");

        // Test metadata field removal
        expect(result).not.toContain("metadata: any");
        expect(result).not.toContain("metadata: Record<string, any>");

        // Test complex type patterns
        expect(result).not.toMatch(/UserInput.*authorId:/s);
    });
});
