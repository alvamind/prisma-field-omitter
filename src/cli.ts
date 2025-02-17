#!/usr/bin/env node
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
        await processorController.process(config);
        return true;
    } catch (error: any) {
        loggerService.loggerService.error('Error during processing:', error);
        throw error;
    }
}

// Add CLI execution handler
if (require.main === module || import.meta.main) {
    const args = process.argv.slice(2);
    const configIndex = args.indexOf('--config');

    if (configIndex === -1 || !args[configIndex + 1]) {
        loggerService.loggerService.error('Error: --config option is required');
        process.exit(1);
    }

    const options: ProcessingOptions = {
        configPath: args[configIndex + 1],
        verbose: args.includes('--verbose')
    };

    run(options).catch((error) => {
        loggerService.loggerService.error('Fatal error:', error);
        process.exit(1);
    });
}
