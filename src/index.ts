import Alvamind from 'alvamind';
import { processorController } from './modules/processor.controller';
import { configService } from './modules/config.service';
import { loggerService } from './modules/logger.service';
import type { ProcessingOptions } from './types';

// Set up the Alvamind instance
Alvamind({ name: 'prisma-field-omitter' })
  .use(processorController)
  .use(configService)
  .use(loggerService)
  .derive(({ process: processOmit, configService: { readConfig }, loggerService: { info, success, error: logError } }) => ({
    run: async (options: ProcessingOptions) => {
      try {
        info('Starting prisma-field-omitter...');
        const config = await readConfig(options.configPath);
        const startTime = Date.now();

        await processOmit(config);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        success(`Processing completed successfully in ${duration}s!`);
      } catch (error) {
        logError('Error during processing:', error);
        process.exit(1);
      }
    }
  }));

// Instead of duplicating CLI argument processing here we export the run function 
// and let cli.ts handle CLI execution.
export { run } from "./cli";