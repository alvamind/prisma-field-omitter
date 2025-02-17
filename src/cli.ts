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
