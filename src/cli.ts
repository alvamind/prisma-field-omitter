import { readFileSync } from "fs";
import type { ProcessingOptions, Config } from "./types";
import { processorController } from "./modules/processor/processor.controller";
import { validationService } from "./modules/validation/validation.service";

export async function readConfig(configPath: string): Promise<Config> {
    if (!configPath) {
        throw new Error('Config path is required');
    }

    try {
        const content = readFileSync(configPath, 'utf-8');
        let config: Config;

        try {
            config = JSON.parse(content);
        } catch (e) {
            throw new Error(`Invalid JSON in config file: ${configPath}`);
        }

        const validationErrors = validationService.validationService.validateConfig(config);
        if (validationErrors.length > 0) {
            throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        return config;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error(`Config file not found: ${configPath}`);
        }
        throw error;
    }
}

export async function run(options: ProcessingOptions) {
    if (!options.configPath) {
        throw new Error('--config option is required');
    }

    try {
        const config = await readConfig(options.configPath);
        await processorController.process(config);
        return true;
    } catch (error: any) {
        console.error('Error during processing:', error.message);
        throw error;
    }
}
