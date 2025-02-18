import Alvamind, { AlvamindInstance } from 'alvamind';
import { processorService } from './processor.service';
import { progressService } from './progress.service';
import { statsService, type ProcessingStats } from './stats.service';
import { validationService } from './validation.service';
import { loggerService } from './logger.service';
import type { Config } from '../types';

export const processorController: AlvamindInstance = Alvamind({ name: 'processor.controller' })
  .use(processorService)
  .use(progressService)
  .use(statsService)
  .use(validationService)
  .use(loggerService)
  .derive(({
    processorService: { getInputFiles, processFile },
    progressService: { create },
    statsService: { createStats },
    validationService: { validateConfig },
    loggerService: { info, warn } }) => ({

      process: async (config: Config): Promise<ProcessingStats> => {
        const validationErrors = validateConfig(config);
        if (validationErrors.length > 0) {
          throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        const stats = createStats();

        const files = (await getInputFiles(Array.isArray(config.originFile)
          ? config.originFile
          : [config.originFile]))
          .filter(file => !file.includes(config.outputDir));

        if (files.length === 0) {
          warn('No input files found matching the specified patterns');
          return stats;
        }

        const progress = create(files.length);
        info('Processing files:');
        process.stdout.write('\n'); // Create a dedicated line for progress bar

        for (const file of files) {
          progress.increment(); // Update progress first
          process.stdout.write('\n'); // Move to next line for file output
          await processFile(file, config, stats, {
            info: (msg) => info(msg),
            warn
          });
        }

        progress.clear();
        info('\n✨ Processing completed:');
        info(`📁 Files processed: ${stats.filesProcessed}`);
        info(`🔄 Types modified: ${stats.typesModified}`);
        info(`🎯 Fields modified: ${stats.fieldsModified}\n`);

        return stats;
      }
    }));
