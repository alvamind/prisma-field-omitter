import Alvamind from 'alvamind';
import { basename, join } from "path";
import { Node, TypeNode, InterfaceDeclaration, PropertySignature } from "ts-morph";
import { processorService } from './processor.service';
import { progressService } from '../progress/progress.service';
import type { Config } from '../../types';

export const processorController = Alvamind({ name: 'processor.controller' })
    .use(processorService)
    .use(progressService)
    .derive(({ processorService, progressService }) => {
        const processFile = async (file: string, config: Config, patternCache: Map<string, boolean>) => {
            const project = processorService.createProject();
            const sourceFile = project.addSourceFileAtPath(file);
            const declarations = [...sourceFile.getTypeAliases(), ...sourceFile.getInterfaces()];

            declarations.forEach(decl => {
                const name = decl.getName();
                if (!processorService.matchesPattern(name, processorService.getTargetPatterns(config), patternCache)) return;

                const node = 'getTypeNode' in decl ? decl.getTypeNode() : decl;
                if (!node) return;

                let properties: PropertySignature[] = [];

                if (Node.isTypeLiteral(node as TypeNode) || Node.isInterfaceDeclaration(node as InterfaceDeclaration)) {
                    properties = (node as any).getProperties()
                        .filter((p: any): p is PropertySignature => Node.isPropertySignature(p));
                }

                processorService.processProperties(properties, name, config,
                    (prop: PropertySignature, typeName: string) =>
                        processorService.shouldProcessProperty(prop, typeName, config, patternCache));
            });

            await Bun.write(
                join(config.outputDir, basename(file)),
                sourceFile.getFullText()
            );

            config.deleteOriginFile && sourceFile.delete();
        };

        return {
            process: async (config: Config) => {
                const patternCache = new Map<string, boolean>();
                const files = await processorService.getInputFiles(
                    Array.isArray(config.originFile) ? config.originFile : [config.originFile]
                );

                const progress = progressService.create(files.length, 'Processing files');

                for (const file of files) {
                    await processFile(file, config, patternCache);
                    progress.increment();
                }
            }
        };
    });
