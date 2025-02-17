import { expect, test, describe, beforeAll, afterAll, beforeEach } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { $ } from "bun";

const TEST_DIR = join(import.meta.dir, "cli-tmp");
const INPUT_DIR = join(TEST_DIR, "input");
const OUTPUT_DIR = join(TEST_DIR, "output");
const CONFIG_DIR = join(TEST_DIR, "config");

const sampleTypes = `
export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    isActive: boolean;
};

export type CreatePostInput = {
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
};
`;

const createConfigFile = async (fileName: string, config: any): Promise<string> => {
    const configPath = join(CONFIG_DIR, fileName);
    await Bun.write(configPath, JSON.stringify(config, null, 2));
    return configPath;
};

const runCli = async (args: string[]): Promise<{ code: number, output: string }> => {
    try {
        // Remove array spreading to preserve argument structure
        const proc = await $`bun run start ${args.join(' ')}`;
        return {
            code: proc.exitCode,
            output: proc.stdout.toString() + proc.stderr.toString()
        };
    } catch (error: any) {
        // Handle the case where the command fails
        return {
            code: error.exitCode || 1,
            output: error.stdout?.toString() + error.stderr?.toString() || error.message
        };
    }
};

describe("CLI with JSON config", () => {
    beforeAll(() => {
        mkdirSync(INPUT_DIR, { recursive: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });
        mkdirSync(CONFIG_DIR, { recursive: true });
    });

    afterAll(() => {
        rmSync(TEST_DIR, { recursive: true, force: true });
    });

    beforeEach(() => {
        // Clean output directory before each test
        rmSync(OUTPUT_DIR, { recursive: true, force: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });

        // Create fresh test file
        writeFileSync(join(INPUT_DIR, "types.ts"), sampleTypes);
    });

    test("should process files using basic JSON config", async () => {
        const configPath = await createConfigFile("basic.json", {
            originFile: join(INPUT_DIR, "types.ts"),
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all",
                on: "both"
            }]
        });

        const { code, output } = await runCli(["--config", configPath]);
        expect(code).toBe(0);

        const result = await Bun.file(join(OUTPUT_DIR, "types.ts")).text();
        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");
        expect(result).toContain("email: string");
    });

    test("should handle multiple field patterns in JSON config", async () => {
        const configPath = await createConfigFile("multiple-patterns.json", {
            originFile: join(INPUT_DIR, "types.ts"),
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [{
                field: ["*At", "password", "*Id"],
                target: ["*Input", "User"],
                on: "both"
            }]
        });

        const { code } = await runCli(["--config", configPath]);
        expect(code).toBe(0);

        const result = await Bun.file(join(OUTPUT_DIR, "types.ts")).text();
        expect(result).not.toContain("createdAt");
        expect(result).not.toContain("updatedAt");
        expect(result).not.toContain("password");
        expect(result).not.toContain("authorId");
        expect(result).toContain("email: string");
    });

    test("should handle invalid JSON config", async () => {
        const configPath = await createConfigFile("invalid.json", "{ invalid json }");
        const { code, output } = await runCli(["--config", configPath]);
        expect(code).not.toBe(0);
        expect(output).toContain("Error");
    });

    test("should handle missing required fields in config", async () => {
        const configPath = await createConfigFile("missing-fields.json", {
            outputDir: OUTPUT_DIR,
            action: "comment"
        });

        const { code, output } = await runCli(["--config", configPath]);
        expect(code).not.toBe(0);
        expect(output).toContain("Error");
    });

    test("should handle multiple hide rules", async () => {
        const configPath = await createConfigFile("multiple-rules.json", {
            originFile: join(INPUT_DIR, "types.ts"),
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "delete",
            generateOmitTypes: false,
            hide: [
                {
                    field: "*At",
                    target: "all",
                    on: "both"
                },
                {
                    field: ["password", "isActive"],
                    target: ["User"],
                    on: "both"
                },
                {
                    field: "isPublished",
                    target: ["*Input"],
                    on: "both"
                }
            ]
        });

        const { code } = await runCli(["--config", configPath]);
        expect(code).toBe(0);

        const result = await Bun.file(join(OUTPUT_DIR, "types.ts")).text();
        expect(result).not.toContain("createdAt");
        expect(result).not.toContain("updatedAt");
        expect(result).not.toContain("password");
        expect(result).not.toContain("isActive");
        expect(result).not.toContain("isPublished");
        expect(result).toContain("email: string");
        expect(result).toContain("title: string");
    });

    test("should handle glob patterns in file paths", async () => {
        // Create additional test files
        writeFileSync(join(INPUT_DIR, "users.model.ts"), sampleTypes);
        writeFileSync(join(INPUT_DIR, "posts.model.ts"), sampleTypes);

        const configPath = await createConfigFile("glob-patterns.json", {
            originFile: join(INPUT_DIR, "*.model.ts"),
            outputDir: OUTPUT_DIR,
            deleteOriginFile: false,
            action: "comment",
            generateOmitTypes: false,
            hide: [{
                field: "*At",
                target: "all",
                on: "both"
            }]
        });

        const { code } = await runCli(["--config", configPath]);
        expect(code).toBe(0);

        const results = await Promise.all([
            Bun.file(join(OUTPUT_DIR, "users.model.ts")).exists(),
            Bun.file(join(OUTPUT_DIR, "posts.model.ts")).exists()
        ]);

        expect(results.every(Boolean)).toBe(true);
    });
});
