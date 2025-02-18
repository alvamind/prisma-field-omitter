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

    // Don't resolve paths in config, just use relative paths
    const configContent = {
        ...config,
        originFile: config.originFile,
        outputDir: OUTPUT_DIR  // Use absolute path for output dir only
    };

    await Bun.write(configPath, JSON.stringify(configContent, null, 2));
    return configPath;
};

const runCli = async (args: string[]): Promise<{ code: number, output: string }> => {
    try {
        // Try to find CLI in different locations
        const possibleCliPaths = [
            resolve(import.meta.dir, '..', 'src', 'cli.ts'),
            resolve(import.meta.dir, '..', 'dist', 'cli.js'),
            resolve(import.meta.dir, '..', 'cli.js')
        ];

        let cliPath = '';
        for (const path of possibleCliPaths) {
            if (existsSync(path)) {
                cliPath = path;
                break;
            }
        }

        if (!cliPath) {
            throw new Error('CLI executable not found');
        }

        console.log(`Running CLI with path: ${cliPath}`);
        console.log(`Arguments: ${args.join(' ')}`);

        // Mock process.stdout.clearLine for tests
        if (!process.stdout.clearLine) {
            process.stdout.clearLine = (_dir: number, callback?: () => void) => {
                if (callback) callback();
                return true;
            };
        }

        // Use node directly for .js files, bun for .ts files
        const command = cliPath.endsWith('.ts') ? ['bun', 'run'] : ['node'];
        const proc = Bun.spawn([...command, cliPath, ...args], {
            stdout: 'pipe',
            stderr: 'pipe',
            cwd: process.cwd(),
            env: { ...process.env, NODE_ENV: 'test' }
        });

        const output = await new Response(proc.stdout).text();
        const error = await new Response(proc.stderr).text();
        const exitCode = await proc.exited;

        console.log(`CLI Output: ${output}`);
        if (error) console.error(`CLI Error: ${error}`);
        console.log(`Exit code: ${exitCode}`);

        return {
            code: exitCode,
            output: output + error
        };
    } catch (error: any) {
        console.error(`CLI execution error: ${error}`);
        return {
            code: 1,
            output: error.message || String(error)
        };
    }
};

// Increase sleep duration to ensure file operations complete
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("CLI with JSON config", () => {
    beforeAll(() => {
        // Clean up previous test directory if it exists
        rmSync(TEST_DIR, { recursive: true, force: true });

        // Create fresh test directories
        mkdirSync(INPUT_DIR, { recursive: true });
        mkdirSync(OUTPUT_DIR, { recursive: true });
        mkdirSync(CONFIG_DIR, { recursive: true });

        console.log('Test directories created:', {
            TEST_DIR,
            INPUT_DIR,
            OUTPUT_DIR,
            CONFIG_DIR
        });
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

    // prisma-field-omitter/test/cli.test.ts
    test("should process files using basic JSON config", async () => {
        const configPath = await createConfigFile("basic.json", {
            originFile: "test/cli-tmp/input/types.ts", // Use relative path
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

        // Verify input file exists
        const inputFile = join(INPUT_DIR, "types.ts");
        console.log(`Input file exists: ${existsSync(inputFile)}`);
        console.log(`Input file content:`, await Bun.file(inputFile).text());

        const { code, output } = await runCli(["--config", configPath]);
        console.log('CLI output:', output);

        // Increase sleep duration and add file system sync
        await sleep(1000);

        const outputFile = join(OUTPUT_DIR, "types.ts");
        console.log(`Output file path: ${outputFile}`);
        console.log(`Output directory exists: ${existsSync(OUTPUT_DIR)}`);

        // Check if the output file exists *before* reading it
        expect(existsSync(outputFile)).toBe(true); // This was failing

        if (existsSync(outputFile)) {
            const result = await Bun.file(outputFile).text();
            console.log('Output file content:', result);
            expect(result).toContain("// createdAt: Date");
            expect(result).toContain("// updatedAt: Date");
            expect(result).toContain("email: string");
        }

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