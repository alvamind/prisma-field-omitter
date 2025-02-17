import { expect, test, describe, beforeAll, afterAll, beforeEach } from "bun:test";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";

const TEST_DIR = resolve(import.meta.dir, "cli-tmp");
const INPUT_DIR = resolve(TEST_DIR, "input");
const OUTPUT_DIR = resolve(TEST_DIR, "output");
const CONFIG_DIR = resolve(TEST_DIR, "config");

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
    const configPath = resolve(CONFIG_DIR, fileName);
    const configContent = {
        ...config,
        // Handle originFile path conversion safely
        originFile: config.originFile ? (
            Array.isArray(config.originFile)
                ? config.originFile.map((p: string) => resolve(p))
                : resolve(config.originFile)
        ) : undefined,
        outputDir: resolve(config.outputDir || OUTPUT_DIR)
    };
    await Bun.write(configPath, JSON.stringify(configContent, null, 2));
    return configPath;
};

const runCli = async (args: string[]): Promise<{ code: number, output: string }> => {
    try {
        const cliPath = resolve(import.meta.dir, '..', 'src', 'index.ts');

        // Mock process.stdout.clearLine for tests
        if (!process.stdout.clearLine) {
            process.stdout.clearLine = (_dir: number, callback?: () => void) => {
                if (callback) {
                    callback();
                }
                return true;
            };
        }

        const proc = Bun.spawn(['bun', 'run', cliPath, ...args], {
            stdout: 'pipe',
            stderr: 'pipe',
            cwd: process.cwd(),
            env: { ...process.env, NODE_ENV: 'test' }
        });

        const output = await new Response(proc.stdout).text();
        const error = await new Response(proc.stderr).text();
        const exitCode = await proc.exited;

        return {
            code: exitCode,
            output: output + error
        };
    } catch (error: any) {
        return {
            code: 1,
            output: error.message || String(error)
        };
    }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
        const inputFile = join(INPUT_DIR, "types.ts");
        writeFileSync(inputFile, sampleTypes);

        // Ensure the file exists
        if (!existsSync(inputFile)) {
            throw new Error(`Test file not created: ${inputFile}`);
        }
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

        const { code } = await runCli(["--config", configPath]);

        // Add small delay to ensure file system operations complete
        await sleep(100);

        const outputFile = join(OUTPUT_DIR, "types.ts");
        expect(existsSync(outputFile)).toBe(true);

        const result = await Bun.file(outputFile).text();
        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");
        expect(result).toContain("email: string");
        expect(code).toBe(0);
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

        const { code, output } = await runCli(["--config", configPath]);
        expect(output).not.toContain("Error");
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

        const { code, output } = await runCli(["--config", configPath]);
        expect(output).not.toContain("Error");
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

        const { code, output } = await runCli(["--config", configPath]);
        expect(output).not.toContain("Error");
        expect(code).toBe(0);

        const results = await Promise.all([
            Bun.file(join(OUTPUT_DIR, "users.model.ts")).exists(),
            Bun.file(join(OUTPUT_DIR, "posts.model.ts")).exists()
        ]);

        expect(results.every(Boolean)).toBe(true);
    });
});
