import Alvamind from 'alvamind';
import { processorService } from './processor.service';
import { progressService } from './progress.service';
import { statsService, type ProcessingStats } from './stats.service';
import { validationService } from './validation.service';
import { loggerService } from './logger.service';
import type { Config } from '../types';
import { readFileSync } from 'fs';
import path from 'path';

export const processorController = Alvamind({ name: 'processor.controller' })
  .use(processorService)
  .use(progressService)
  .use(statsService)
  .use(validationService)
  .use(loggerService)
  .derive(({
    processorService: { getInputFiles, processFile, matchesField },
    progressService: { createFieldProgress },
    statsService: { createStats },
    validationService: { validateConfig },
    loggerService: { info, warn } }) => ({

      process: async (config: Config): Promise<ProcessingStats> => {
        const validationErrors = validateConfig(config);
        if (validationErrors.length > 0) {
          throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        const stats = createStats();

        // Capture processing start time
        const startTime = process.hrtime();

        const files = (await getInputFiles(Array.isArray(config.originFile)
          ? config.originFile
          : [config.originFile]))
          .filter(file => !file.includes(config.outputDir));

        if (files.length === 0) {
          warn('No input files found matching the specified patterns');
          return stats;
        }

        // Pre-scan: Count total matching fields across all files based on config.hide rules.
        let totalFields = 0;
        for (const file of files) {
          const content = readFileSync(file, 'utf-8');
          const lines = content.split('\n');
          for (const rule of config.hide) {
            for (const line of lines) {
              const fieldRegex = /(\s*)(\w+)\??:\s*(.+);?/;
              const fieldMatch = line.match(fieldRegex);
              if (fieldMatch) {
                const fieldName = fieldMatch[2];
                if (matchesField(fieldName, rule.field)) {
                  totalFields++;
                }
              }
            }
          }
        }

        const progress = createFieldProgress(totalFields);
        process.stdout.write('\n'); // Reserve line for progress bar

        for (const file of files) {
          // Track field changes per file.
          const before = stats.fieldsModified;
          await processFile(file, config, stats);
          const diff = stats.fieldsModified - before;
          progress.increment(diff);
        }

        progress.clear();
        // Calculate and log elapsed time
        const diffTime = process.hrtime(startTime);
        const seconds = diffTime[0];
        const msecs = Math.round(diffTime[1] / 1e6);
        const outputPath = path.relative(process.cwd(), config.outputDir);

        info(`\n✨ Completed in ${seconds}s / ${msecs}ms:`);
        info(`📁 Files processed: ${stats.filesProcessed}`);
        info(`🔄 Types modified: ${stats.typesModified}`);
        info(`🎯 Fields modified: ${stats.fieldsModified}`);
        info(`📂 Output path: ${outputPath}\n`);

        return stats;
      }
    }));
