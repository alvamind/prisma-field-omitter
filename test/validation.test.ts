import { expect, test, describe } from "bun:test";
import { validationService } from "../src/modules/validation/validation.service";
import schema from "../src/prisma-field-omitter.schema.json";

describe("ConfigValidator", () => {
    test("should validate valid config with string originFile", () => {
        const config = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{ field: "*At" }]
        };

        const errors = validationService.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should validate valid config with array originFile", () => {
        const config = {
            originFile: ["test/*.ts", "src/*.ts"],
            outputDir: "output",
            hide: [{ field: ["createdAt", "updatedAt"] }]
        };

        const errors = validationService.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should validate generateOmitTypes requirements", () => {
        const config = {
            originFile: "test/*.ts",
            outputDir: "output",
            generateOmitTypes: true,
            hide: [{ field: "*At" }]
        };

        const errors = validationService.validateConfig(config);
        expect(errors).toContain("generatedOmitTypesOutputPath is required when generateOmitTypes is true");
    });

    test("should validate valid config", () => {
        const config = {
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

        const errors = validationService.validateConfig(config);
        expect(errors).toHaveLength(0);
    });

    test("should catch missing required fields", () => {
        const config = {
            outputDir: "output",
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        const errors = validationService.validateConfig(config as any);
        expect(errors).toContain(`Missing required field: ${schema.required[0]}`);
    });

    test("should validate hide rules according to schema", () => {
        const config = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{
                target: "all",
                on: "invalid"
            }]
        };

        const errors = validationService.validateConfig(config as any);
        expect(errors).toContain("Hide rule #1: Missing required field field");
        expect(errors).toContain(`Hide rule #1: Invalid 'on' value. Must be ${schema.properties.hide.items.properties.on.enum.join(', ')}`);
    });

    test("should validate action field according to schema", () => {
        const config = {
            originFile: "test/*.ts",
            outputDir: "output",
            action: "invalid",
            hide: [{
                field: "*At",
                target: "all"
            }]
        };

        const errors = validationService.validateConfig(config as any);
        expect(errors).toContain(`Invalid action value. Must be ${schema.properties.action.enum.join(' or ')}`);
    });

    test("should validate hide rule field formats", () => {
        const config = {
            originFile: "test/*.ts",
            outputDir: "output",
            hide: [{
                field: 123,
                target: "all"
            }]
        };

        const errors = validationService.validateConfig(config as any);
        expect(errors).toContain("Hide rule #1: field must be a string or array of strings");
    });
});
