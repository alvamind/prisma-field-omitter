import Alvamind from 'alvamind';
import { processorController } from './modules/processor.controller';
import { configService } from './modules/config.service';
import { loggerService } from './modules/logger.service';
import type { ProcessingOptions } from './types';
import { run } from "./cli";

Alvamind({ name: 'prisma-field-omitter' })
    .use(processorController)
    .use(configService)
    .use(loggerService)
    .derive(({ processorController, configService: { readConfig }, loggerService: { info, success, error: logError } }) => ({
        run: async (options: ProcessingOptions) => {
            try {
                info('Starting prisma-field-omitter...');
                const config = await readConfig(options.configPath);
                const startTime = Date.now();

                await processorController.process(config);

                const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                success(`Processing completed successfully in ${duration}s!`);
            } catch (error) {
                logError('Error during processing:', error);
                process.exit(1);
            }
        }
    }));

if (import.meta.main) {
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

export { run };
