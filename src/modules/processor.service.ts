import Alvamind from 'alvamind';
import { Config, HideRule, Logger } from '../types';
import { ProcessingStats } from './stats.service';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import * as path from 'path';
import { Glob } from 'bun';

export const processorService = Alvamind({ name: 'processor.service' })
  .decorate('processorService', {
    matchesTarget(typeName: string, target: HideRule['target']): boolean {
      if (!target) return false;
      if (target === 'all') return true;

      if (Array.isArray(target)) {
        return target.some(pattern => {
          const glob = new Glob(pattern);
          return glob.match(typeName);
        });
      }
      const glob = new Glob(target as string);
      return glob.match(typeName);
    },

    matchesField(fieldName: string, fields: string | string[]): boolean {
      if (Array.isArray(fields)) {
        return fields.some(fieldPattern => {
          const glob = new Glob(fieldPattern);
          return glob.match(fieldName);
        });
      }
      const glob = new Glob(fields);
      return glob.match(fieldName);
    },

    applyRule(content: string, rule: HideRule, config: Config, logger: Logger, stats: ProcessingStats): string {
      const { field, target, on = 'both' } = rule;
      const action = config.action || 'comment';

      const lines = content.split('\n');
      let inTargetType = false;
      let currentTypeName: string | null = null;
      let modifiedLines: string[] = [];
      let typeModified = false;

      for (const line of lines) {
        const typeStartMatch = line.match(/export\s+type\s+(\w+)\s*=/);
        if (typeStartMatch) {
          currentTypeName = typeStartMatch[1];
          inTargetType = self.matchesTarget(currentTypeName, target);
        }

        const typeEndMatch = line.match(/^\s*};?\s*$/);
        if (typeEndMatch && inTargetType) {
          if (typeModified) {
            stats.typesModified++;
            typeModified = false;
          }
          inTargetType = false;
          currentTypeName = null;
        }

        if (inTargetType && currentTypeName) {
          let shouldProcess = false;
          if (on === 'both') {
            shouldProcess = true;
          } else if (on === 'input' && currentTypeName.includes('Input')) {
            shouldProcess = true;
          } else if (on === 'output' && !currentTypeName.includes('Input')) {
            shouldProcess = true;
          }

          let modifiedLine = line;
          if (shouldProcess) {
            const fieldRegex = /(\s*)(\w+)\??:\s*(.+);?/;
            const fieldMatch = modifiedLine.match(fieldRegex);

            if (fieldMatch) {
              const [, indentation, fieldName, fieldType] = fieldMatch;

              if (self.matchesField(fieldName, field)) {
                if (action === 'comment') {
                  modifiedLine = `${indentation}//h/ ${fieldName}: ${fieldType};`;
                } else {
                  modifiedLine = '';
                }
                typeModified = true;
                stats.fieldsModified++;
              }
            }
          }
          modifiedLines.push(modifiedLine);
        } else {
          modifiedLines.push(line);
        }
      }

      return modifiedLines.join('\n');
    },

    async getInputFiles(patterns: string[]): Promise<string[]> {
      const files: string[] = [];
      for (const pattern of patterns) {
        const glob = new Glob(pattern);
        for await (const file of glob.scan({ cwd: process.cwd(), absolute: true })) {
          files.push(file);
        }
      }
      return files;
    },

    async processFile(
      filePath: string,
      config: Config,
      stats: ProcessingStats,
      logger: Logger
    ): Promise<void> {
      try {
        let content = readFileSync(filePath, 'utf-8');
        const originalContent = content;

        for (const rule of config.hide) {
          content = self.applyRule(content, rule, config, logger, stats);
        }

        if (content !== originalContent) {
          const outputFilePath = path.join(
            config.outputDir,
            path.relative(path.dirname(Array.isArray(config.originFile) ? config.originFile[0] : config.originFile), filePath)
          );

          // Ensure output directory exists
          mkdirSync(path.dirname(outputFilePath), { recursive: true });

          writeFileSync(outputFilePath, content, 'utf-8');
          stats.filesProcessed++;
          logger.info(`Processed: ${path.basename(filePath)}`);
        }
      } catch (error) {
        logger.warn(`Error processing file ${filePath}: ${(error as any).message}`);
      }
    }
  });

const self = processorService.processorService;