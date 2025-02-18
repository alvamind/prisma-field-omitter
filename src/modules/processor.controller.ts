import Alvamind, { AlvamindInstance } from 'alvamind';
import { basename, join } from "path";
import { Node, TypeNode, InterfaceDeclaration, PropertySignature } from "ts-morph";
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
    processorService: { createProject, matchesPattern, getTargetPatterns, shouldProcessProperty, processNestedProperties, getInputFiles },
    progressService: { create },
    statsService: { createStats },
    validationService: { validateConfig },
    loggerService: { info, warn } }) => {

    const processFile = async (file: string, config: Config, stats: ProcessingStats) => {
      info(`Processing file: ${file}`);
      const project = createProject();
      const sourceFile = project.addSourceFileAtPath(file);

      const declarations = [
        ...sourceFile.getTypeAliases(),
        ...sourceFile.getInterfaces(),
        ...sourceFile.getClasses(),
      ];

      let modified = false;
      for (const decl of declarations) {
        const name = decl.getName();
        if (!name) continue; // Skip declarations without names

        const targetPatterns = getTargetPatterns(config);
        if (!matchesPattern(name, targetPatterns)) continue;

        const node = 'getTypeNode' in decl ? decl.getTypeNode() : decl;
        if (!node) continue;

        let properties: PropertySignature[] = [];
        if (Node.isTypeLiteral(node as TypeNode) || Node.isInterfaceDeclaration(node as InterfaceDeclaration)) {
          properties = (node as any).getProperties()
            .filter((p: any): p is PropertySignature => Node.isPropertySignature(p));
        }

        const modifiedProperties = properties.filter(prop =>
          shouldProcessProperty(prop, name, config));

        if (modifiedProperties.length > 0) {
          modified = true;
          stats.typesModified++;
          stats.fieldsModified += modifiedProperties.length;

          modifiedProperties.forEach(prop => {
            const text = prop.getText();
            if (config.action === "delete") {
              prop.remove();
            } else {
              prop.replaceWithText(text.split('\n').map(line => `// ${line}`).join('\n'));
            }
          });

          properties.forEach(prop => {
            if (prop.wasForgotten()) return;
            const propTypeNode = prop.getTypeNode();
            if (propTypeNode && !propTypeNode.wasForgotten() && Node.isTypeLiteral(propTypeNode)) {
              processNestedProperties(propTypeNode, name, config);
            }
          });
        }
      }

      const outputPath = join(config.outputDir, basename(file));
      info(`Writing output to: ${outputPath}`);
      if (modified) {
        await Bun.write(outputPath, sourceFile.getFullText());
        stats.filesProcessed++;
      }

      if (modified && config.deleteOriginFile) {
        await Bun.write(file, '');
        await unlink(file);
      }
    };

    return {
      process: async (config: Config): Promise<ProcessingStats> => {
        const validationErrors = validateConfig(config);
        if (validationErrors.length > 0) {
          throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
        }

        const stats = createStats();
        const inputPatterns = Array.isArray(config.originFile) ? config.originFile : [config.originFile];
        const files = await getInputFiles(inputPatterns);

        if (files.length === 0) {
          warn('No input files found matching the specified patterns');
          return stats; // Return stats even if no files were found
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

        return stats; // Return the stats object
      }
    };
  });
