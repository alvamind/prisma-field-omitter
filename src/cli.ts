#!/usr/bin/env -S bun --bun

import type { ProcessingOptions } from "./types";
import { processorController } from "./modules/processor.controller";
import { configService } from "./modules/config.service";
import { loggerService } from "./modules/logger.service";

export async function run(options: ProcessingOptions) {
    if (!options.configPath) {
        throw new Error('--config option is required');
    }

    try {
        const config = await configService.configService.readConfig(options.configPath);
        if (!config) {
            throw new Error('Invalid configuration');
        }

        const stats = await processorController.process(config);
        return stats.filesProcessed > 0; // Return true if any files were processed
    } catch (error: any) {
        loggerService.loggerService.error('Error during processing:', error);
        throw error;
    }
}

// CLI execution handler
if (import.meta.main) { // Use import.meta.main for ESM
    const args = process.argv.slice(2);
    const configIndex = args.indexOf('--config');

    if (configIndex === -1 || !args[configIndex + 1]) {
        loggerService.loggerService.error('Error: --config option is required');
        process.exit(1);
    }

    const configPath = args[configIndex + 1];
    if (!configPath) {
        loggerService.loggerService.error('Error: --config value is missing');
        process.exit(1);
    }

    const options: ProcessingOptions = {
        configPath,
        verbose: args.includes('--verbose')
    };

    run(options).catch((error) => {
        loggerService.loggerService.error('Fatal error:', error);
        process.exit(1);
    });
}
