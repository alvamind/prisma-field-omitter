import Alvamind from 'alvamind';
import { basename, join } from "path";
import { Node, TypeNode, InterfaceDeclaration, PropertySignature } from "ts-morph";
import { processorService } from './processor.service';
import { progressService } from './progress.service';
import { statsService, type ProcessingStats } from './stats.service';
import { validationService } from './validation.service';
import { loggerService } from './logger.service';
import { unlink } from 'fs/promises';
import type { Config } from '../types';

export const processorController = Alvamind({ name: 'processor.controller' })
  .use(processorService)
  .use(progressService)
  .use(statsService)
  .use(validationService)
  .use(loggerService)
  .derive(({
    processorService: { createProject, matchesPattern, getTargetPatterns, processProperties, shouldProcessProperty, processNestedProperties, getInputFiles },
    progressService: { create },
    statsService: { createStats },
    validationService: { validateConfig },
    loggerService: { info, warn } }) => {

    const processFile = async (file: string, config: Config, patternCache: Map<string, boolean>, stats: ProcessingStats) => {
      info(`Processing file: ${file}`);
      const project = createProject();
      const sourceFile = project.addSourceFileAtPath(file);
      const declarations = [...sourceFile.getTypeAliases(), ...sourceFile.getInterfaces()];

      let modified = false;
      for (const decl of declarations) {
        const name = decl.getName();
        const targetPatterns = getTargetPatterns(config);

        // Process if the declaration matches any target pattern
        if (!matchesPattern(name, targetPatterns, patternCache)) continue;

        const node = 'getTypeNode' in decl ? decl.getTypeNode() : decl;
        if (!node) continue;

        let properties: PropertySignature[] = [];
        if (Node.isTypeLiteral(node as TypeNode) || Node.isInterfaceDeclaration(node as InterfaceDeclaration)) {
          properties = (node as any).getProperties()
            .filter((p: any): p is PropertySignature => Node.isPropertySignature(p));
        }

        const modifiedProperties = properties.filter(prop =>
          shouldProcessProperty(prop, name, config, patternCache));

        if (modifiedProperties.length > 0) {
          modified = true;
          stats.typesModified++;
          stats.fieldsModified += modifiedProperties.length;

          processProperties(properties, name, config,
            (prop: PropertySignature, typeName: string) =>
              shouldProcessProperty(prop, typeName, config, patternCache));

          // Process nested properties with guards
          properties.forEach(prop => {
            if (prop.wasForgotten()) return;
            const propTypeNode = prop.getTypeNode();
            if (propTypeNode && !propTypeNode.wasForgotten() && Node.isTypeLiteral(propTypeNode)) {
              processNestedProperties(propTypeNode, name, config, patternCache);
            }
          });
        }
      }

      if (modified) {
        const outputPath = join(config.outputDir, basename(file));
        info(`Writing output to: ${outputPath}`);
        await Bun.write(outputPath, sourceFile.getFullText());
        stats.filesProcessed++;
      }

      if (modified && config.deleteOriginFile) {
        await Bun.write(file, ''); // Clear file before deletion
        await unlink(file);
      }
    };

    return {
      process: async (config: Config) => {
        const validationErrors = validateConfig(config);
        if (validationErrors.length > 0) {
          throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        const patternCache = new Map<string, boolean>();
        const stats = createStats();
        const inputPatterns = Array.isArray(config.originFile) ? config.originFile : [config.originFile];
        const files = await getInputFiles(inputPatterns);

        if (files.length === 0) {
          warn('No input files found matching the specified patterns');
          return;
        }

        const progress = create(files.length, 'Processing files');

        for (const file of files) {
          progress.clear(); // Clear before file processing message
          await processFile(file, config, patternCache, stats);
          progress.increment();
        }

        progress.clear(); // Ensure progress bar is cleared
        info('\nProcessing completed:');
        info(`- Files processed: ${stats.filesProcessed}`);
        info(`- Types modified: ${stats.typesModified}`);
        info(`- Fields modified: ${stats.fieldsModified}`);
      }
    };
  });
