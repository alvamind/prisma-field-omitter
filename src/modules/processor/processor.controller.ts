import Alvamind from 'alvamind';
import { basename, join } from "path";
import { Node, TypeNode, InterfaceDeclaration, PropertySignature } from "ts-morph";
import { processorService } from './processor.service';
import { progressService } from '../progress/progress.service';
import { statsService, type ProcessingStats } from '../stats/stats.service';
import type { Config } from '../../types';

export const processorController = Alvamind({ name: 'processor.controller' })
    .use(processorService)
    .use(progressService)
    .use(statsService)
    .derive(({ processorService: { createProject, matchesPattern, getTargetPatterns, processProperties, shouldProcessProperty, getInputFiles },
        progressService: { create },
        statsService: { createStats } }) => {
        const processFile = async (file: string, config: Config, patternCache: Map<string, boolean>, stats: ProcessingStats) => {
            const project = createProject();
            const sourceFile = project.addSourceFileAtPath(file);
            const declarations = [...sourceFile.getTypeAliases(), ...sourceFile.getInterfaces()];

            declarations.forEach(decl => {
                const name = decl.getName();
                if (!matchesPattern(name, getTargetPatterns(config), patternCache)) return;

                const node = 'getTypeNode' in decl ? decl.getTypeNode() : decl;
                if (!node) return;

                let properties: PropertySignature[] = [];
                if (Node.isTypeLiteral(node as TypeNode) || Node.isInterfaceDeclaration(node as InterfaceDeclaration)) {
                    properties = (node as any).getProperties()
                        .filter((p: any): p is PropertySignature => Node.isPropertySignature(p));
                }

                const modifiedProperties = properties.filter(prop =>
                    shouldProcessProperty(prop, name, config, patternCache));

                if (modifiedProperties.length > 0) {
                    stats.typesModified++;
                    stats.fieldsModified += modifiedProperties.length;
                }

                processProperties(properties, name, config,
                    (prop: PropertySignature, typeName: string) =>
                        shouldProcessProperty(prop, typeName, config, patternCache));
            });

            await Bun.write(
                join(config.outputDir, basename(file)),
                sourceFile.getFullText()
            );

            stats.filesProcessed++;
            config.deleteOriginFile && sourceFile.delete();
        };

        return {
            process: async (config: Config) => {
                const patternCache = new Map<string, boolean>();
                const stats = createStats();
                const files = await getInputFiles(
                    Array.isArray(config.originFile) ? config.originFile : [config.originFile]
                );

                const progress = create(files.length, 'Processing files');

                for (const file of files) {
                    await processFile(file, config, patternCache, stats);
                    progress.increment();
                }

                console.log('\nProcessing completed:');
                console.log(`- Files processed: ${stats.filesProcessed}`);
                console.log(`- Types modified: ${stats.typesModified}`);
                console.log(`- Fields modified: ${stats.fieldsModified}`);
            }
        };
    });
