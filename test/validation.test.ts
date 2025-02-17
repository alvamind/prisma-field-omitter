import { expect, test, describe } from "bun:test";
import { validationService } from "../src/modules/validation/validation.service";
import schema from "../src/prisma-field-omitter.schema.json";
import type { Config } from "../src/types";

const validationServiceModule = validationService.validationService;

describe("ConfigValidator", () => {
    test("should validate valid config with string originFile", () => {
        const config: Config = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{ field: "*At" }]
        };

        const errors = validationServiceModule.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should validate valid config with array originFile", () => {
        const config: Config = {
            originFile: ["test/*.ts", "src/*.ts"],
            outputDir: "output",
            hide: [{ field: ["createdAt", "updatedAt"] }]
        };

        const errors = validationServiceModule.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should validate generateOmitTypes requirements", () => {
        const config: Config = {
            originFile: "test/*.ts",
            outputDir: "output",
            generateOmitTypes: true,
            hide: [{ field: "*At" }]
        };

        const errors = validationServiceModule.validateConfig(config);
        expect(errors).toContain("generatedOmitTypesOutputPath is required when generateOmitTypes is true");
    });

    test("should validate valid config", () => {
        const config: Config = {
            originFile: "test/*.ts",
            outputDir: "output",
            deleteOriginFile: false,
            action: "comment",
            hide: [{
                field: "*At",
                target: "all",
                on: "input"
            }]
        };

        const errors = validationServiceModule.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should catch missing required fields", () => {
        const config: Partial<Config> = {
            outputDir: "output",
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        const errors = validationServiceModule.validateConfig(config as Config);
        expect(errors).toContain(`Missing required field: ${schema.required[0]}`);
    });

    test("should validate hide rules according to schema", () => {
        const config: Partial<Config> = {
            originFile: "test/*.ts",
            outputDir: "output",
            // @ts-expect-error
            hide: [{
                target: "all",
                on: "invalid" as "input" | "output" | "both"
            }]
        };

        const errors = validationServiceModule.validateConfig(config as Config);
        expect(errors).toContain("Hide rule #1: Missing required field field");

        const configWithInvalidOn: Config = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{
                field: "*At",
                target: "all",
                on: "invalid" as "input" | "output" | "both"
            }]
        };

        const errorsWithInvalidOn = validationServiceModule.validateConfig(configWithInvalidOn);
        expect(errorsWithInvalidOn).toContain("Hide rule #1: Invalid 'on' value. Must be input, output, both");
    });

    test("should validate action field according to schema", () => {
        const config: Omit<Config, 'action'> & { action: string } = {
            originFile: "test/*.ts",
            outputDir: "output",
            action: "invalid",
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        const errors = validationServiceModule.validateConfig(config as Config);
        expect(errors).toContain(`Invalid action value. Must be ${schema.properties.action.enum.join(' or ')}`);
    });

    test("should validate hide rule field formats", () => {
        const config: Partial<Config> = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{
                field: 123 as unknown as string,
                target: "all"
            }]
        };

        const errors = validationServiceModule.validateConfig(config as Config);
        expect(errors).toContain("Hide rule #1: field must be a string or array of strings");
    });
});
