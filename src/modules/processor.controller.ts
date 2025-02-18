import Alvamind, { AlvamindInstance } from 'alvamind';
import { basename, join } from "path";
import { Node, PropertySignature } from "ts-morph";
import { processorService } from './processor.service';
import { progressService } from './progress.service';
import { statsService, type ProcessingStats } from './stats.service';
import { validationService } from './validation.service';
import { loggerService } from './logger.service';
import { unlink } from 'fs/promises';
import type { Config } from '../types';

export const processorController: AlvamindInstance = Alvamind({ name: 'processor.controller' })
  .use(processorService)
  .use(progressService)
  .use(statsService)
  .use(validationService)
  .use(loggerService)
  .derive(({
    processorService: { createProject, matchesPattern, getTargetPatterns, shouldProcessProperty, processNestedProperties, getInputFiles, processProperties },
    progressService: { create },
    statsService: { createStats },
    validationService: { validateConfig },
    loggerService: { info, warn } }) => {

    const extractProperties = (decl: any): PropertySignature[] => {
      switch (true) {
        case Node.isTypeAliasDeclaration(decl): {
          const typeNode = decl.getTypeNode();
          return (typeNode && Node.isTypeLiteral(typeNode))
            ? typeNode.getProperties().filter(Node.isPropertySignature)
            : [];
        }
        case Node.isInterfaceDeclaration(decl):
          return decl.getProperties().filter(Node.isPropertySignature);
        default:
          return [];
      }
    };

    const processDeclaration = (
      decl: any,
      config: Config,
      stats: ProcessingStats
    ): void => {
      const name = decl.getName();
      if (!name || !matchesPattern(name, getTargetPatterns(config))) return;

      const properties = extractProperties(decl);
      if (properties.length === 0) return;

      const boundShouldProcessProperty = (prop: PropertySignature, typeName: string) =>
        shouldProcessProperty(prop, typeName, config);

      const modifiedCount = processProperties(properties, name, config, boundShouldProcessProperty);
      if (modifiedCount > 0) {
        stats.typesModified++;
        stats.fieldsModified += modifiedCount;
      }

      properties
        .filter(prop => !prop.wasForgotten())
        .forEach(prop => {
          const typeNode = prop.getTypeNode();
          if (typeNode && !typeNode.wasForgotten() &&
            (Node.isTypeLiteral(typeNode) || Node.isTypeReference(typeNode))) {
            processNestedProperties(typeNode, name, config);
          }
        });
    };

    const processFile = async (file: string, config: Config, stats: ProcessingStats) => {
      const sourceFile = createProject().addSourceFileAtPath(file);
      info(`Processing file: ${file}`);

      [...sourceFile.getTypeAliases(), ...sourceFile.getInterfaces()]
        .forEach(decl => processDeclaration(decl, config, stats));

      const outputPath = join(config.outputDir, basename(file));
      await Bun.write(outputPath, sourceFile.getFullText());
      stats.filesProcessed++;

      if (config.deleteOriginFile) {
        try {
          await unlink(file);
        } catch (error) {
          warn(`Failed to delete original file: ${file}`);
        }
      }
    };

    return {
      process: async (config: Config): Promise<ProcessingStats> => {
        const validationErrors = validateConfig(config);
        if (validationErrors.length > 0) {
          throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        await Bun.write(join(config.outputDir, '.keep'), '');
        const stats = createStats();

        const files = (await getInputFiles(Array.isArray(config.originFile)
          ? config.originFile
          : [config.originFile]))
          .filter(file => !file.includes(config.outputDir));

        if (files.length === 0) {
          warn('No input files found matching the specified patterns');
          return stats;
        }

        const progress = create(files.length, 'Processing files');
        for (const file of files) {
          progress.clear();
          await processFile(file, config, stats);
          progress.increment();
        }

        progress.clear();
        info('\nProcessing completed:');
        info(`- Files processed: ${stats.filesProcessed}`);
        info(`- Types modified: ${stats.typesModified}`);
        info(`- Fields modified: ${stats.fieldsModified}`);

        return stats;
      }
    };
  });
