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

    const runCli = async (configPath: string): Promise<{ code: number, output: string }> => {
        const cliPath = resolve(import.meta.dir, '..', 'src', 'cli.ts');

        // Add debug logging
        console.log('Running CLI with config:', await Bun.file(configPath).text());
        console.log('CLI path:', cliPath);

        // Add process.stdout.clearLine mock for tests
        if (!process.stdout.clearLine) {
            process.stdout.clearLine = (_dir: number) => true;
        }

        const proc = Bun.spawn(['bun', 'run', cliPath, '--config', configPath], {
            stdout: 'pipe',
            stderr: 'pipe',
            env: { ...process.env, NODE_ENV: 'test' }
        });

        const output = await new Response(proc.stdout).text();
        const error = await new Response(proc.stderr).text();
        const exitCode = await proc.exited;

        // Add debug output
        console.log('CLI Output:', output);
        if (error) console.log('CLI Error:', error);
        console.log('Exit code:', exitCode);

        return {
            code: exitCode,
            output: output + error
        };
    };

    const writeConfig = async (config: any): Promise<string> => {
        const configPath = join(TEST_DIR, `config-${Date.now()}.json`);
        // Ensure paths are absolute
        const configContent = {
            ...config,
            originFile: resolve(config.originFile),
            outputDir: resolve(config.outputDir)
        };
        await Bun.write(configPath, JSON.stringify(configContent, null, 2));
        return configPath;
    };

    // Add sleep utility for file operations
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    test("should handle nested input types", async () => {
        const inputFile = join(INPUT_DIR, "nested.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const configPath = await writeConfig({
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
        });

        const { code } = await runCli(configPath);
        await sleep(500); // Add delay for file operations

        expect(code).toBe(0);
        const result = await Bun.file(join(OUTPUT_DIR, "nested.ts")).text();
        expect(result).toContain("// createdAt: Date");
        expect(result).toContain("// updatedAt: Date");
        expect(result).toContain("// lastLoginAt: Date");
        expect(result).toContain("firstName: string");
    });

    test("should delete original files when configured", async () => {
        const inputFile = join(INPUT_DIR, "to-delete.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const configPath = await writeConfig({
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
        });

        const { code } = await runCli(configPath);
        await sleep(500); // Add delay for file operations

        expect(code).toBe(0);
        expect(existsSync(inputFile)).toBe(false);
        expect(existsSync(join(OUTPUT_DIR, "to-delete.ts"))).toBe(true);
    });

    test("should handle complex nested structures", async () => {
        const inputFile = join(INPUT_DIR, "complex.ts");
        writeFileSync(inputFile, nestedTypeSample);

        const configPath = await writeConfig({
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
        });

        const { code } = await runCli(configPath);
        await sleep(500); // Add delay for file operations

        expect(code).toBe(0);
        const result = await Bun.file(join(OUTPUT_DIR, "complex.ts")).text();
        expect(result).not.toContain("createdAt: Date");
        expect(result).not.toContain("updatedAt: Date");
        expect(result).toContain("id: string");
    });

    test("should handle multiple glob patterns in field arrays", async () => {
        const inputFile = join(INPUT_DIR, "multi-glob.ts");
        writeFileSync(inputFile, multipleGlobSample);

        const configPath = await writeConfig({
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
        });

        const { code } = await runCli(configPath);
        await sleep(500); // Add delay for file operations

        expect(code).toBe(0);
        const result = await Bun.file(join(OUTPUT_DIR, "multi-glob.ts")).text();
        expect(result).not.toContain("createdAt");
        expect(result).not.toContain("updatedAt");
        expect(result).not.toContain("authorId");
        expect(result).not.toContain("password");
        expect(result).toContain("id: string");
    });
});
