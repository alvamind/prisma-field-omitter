import { expect, test, describe, beforeAll, afterAll, beforeEach } from "bun:test";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";

const TEST_DIR = resolve(import.meta.dir, "type-processor-tmp");
const INPUT_DIR = resolve(TEST_DIR, "input");
const OUTPUT_DIR = resolve(TEST_DIR, "output");

const nestedTypeSample = `
export type UserInput = {
    profile: {
        personalInfo: {
            firstName: string;
            lastName: string;
            createdAt: Date;
            updatedAt: Date;
        };
        settings: {
            isActive: boolean;
            lastLoginAt: Date;
        };
    };
};

export type ComplexType = {
    data: {
        users: Array<{
            id: string;
            createdAt: Date;
            profile: {
                updatedAt: Date;
            };
        }>;
    };
};
`;

const multipleGlobSample = `
export type UserData = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
};

export type PostData = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
};
`;

describe("TypeProcessor", () => {
    beforeAll(() => {
        rmSync(TEST_DIR, { recursive: true, force: true });
        mkdirSync(INPUT_DIR, { recursive: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });
    });

    afterAll(() => {
        rmSync(TEST_DIR, { recursive: true, force: true });
    });

    beforeEach(() => {
        rmSync(OUTPUT_DIR, { recursive: true, force: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });
    });

    test("should handle nested input types", async () => {
        const inputFile = join(INPUT_DIR, "nested.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const config = {
            originFile: inputFile,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all",
                on: "both"
            }]
        };

        // Add implementation here
        const result = await Bun.file(join(OUTPUT_DIR, "nested.ts")).text();
        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");
        expect(result).toContain("// lastLoginAt: Date");
        expect(result).toContain("firstName: string");
    });

    test("should delete original files when configured", async () => {
        const inputFile = join(INPUT_DIR, "to-delete.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const config = {
            originFile: inputFile,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: true,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all",
                on: "both"
            }]
        };

        // Add implementation here
        expect(existsSync(inputFile)).toBe(false);
        expect(existsSync(join(OUTPUT_DIR, "to-delete.ts"))).toBe(true);
    });

    test("should handle complex nested structures", async () => {
        const inputFile = join(INPUT_DIR, "complex.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const config = {
            originFile: inputFile,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "ComplexType",
                on: "both"
            }]
        };

        // Add implementation here
        const result = await Bun.file(join(OUTPUT_DIR, "complex.ts")).text();
        expect(result).not.toContain("createdAt: Date");
        expect(result).not.toContain("updatedAt: Date");
        expect(result).toContain("id: string");
    });

    test("should handle multiple glob patterns in field arrays", async () => {
        const inputFile = join(INPUT_DIR, "multi-glob.ts");
        writeFileSync(inputFile, multipleGlobSample);

        const config = {
            originFile: inputFile,
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["*At", "*Id", "password"],
                target: "*Data",
                on: "both"
            }]
        };

        // Add implementation here
        const result = await Bun.file(join(OUTPUT_DIR, "multi-glob.ts")).text();
        expect(result).not.toContain("createdAt");
        expect(result).not.toContain("updatedAt");
        expect(result).not.toContain("authorId");
        expect(result).not.toContain("password");
        expect(result).toContain("id: string");
    });
});
