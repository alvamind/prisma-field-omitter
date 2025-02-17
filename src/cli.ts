import { readFileSync } from "fs";
import type { ProcessingOptions } from "./types";
import { processorController } from "./modules/processor/processor.controller";
import { validationService } from "./modules/validation/validation.service";

export async function readConfig(configPath: string) {
    try {
        const content = readFileSync(configPath, 'utf-8');
        const config = JSON.parse(content);

        // Validate the config after parsing
        const validationErrors = validationService.validateConfig(config);
        if (validationErrors.length > 0) {
            throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        return config;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error(`Config file not found: ${configPath}`);
        }
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON in config file: ${configPath}`);
        }
        throw error;
    }
}

export async function run(options: ProcessingOptions) {
    try {
        const config = await readConfig(options.configPath);
        await processorController.process(config);
        console.log('Processing completed successfully!');
    } catch (error: any) {
        console.error('Error during processing:', error.message);
        process.exit(1);
    }
}
