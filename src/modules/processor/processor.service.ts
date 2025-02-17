import Alvamind from 'alvamind';
import { Project, Node, PropertySignature } from "ts-morph";
import { Glob } from "bun";
import type { Config } from '../../types';



export const processorService = Alvamind({ name: 'processor.service' })
    .decorate('processorService', {
        createProject: () => new Project({
            tsConfigFilePath: "tsconfig.json",
            skipAddingFilesFromTsConfig: true,
        }),

        matchesPattern: (value: string, patterns: string[], patternCache: Map<string, boolean>): boolean => {
            return patterns.some(pattern => {
                const isNegated = pattern.startsWith('!');
                const actualPattern = isNegated ? pattern.slice(1) : pattern;
                const matches = self.getCachedPattern(value, actualPattern, patternCache);
                return isNegated ? !matches : matches;
            });
        },

        getCachedPattern: (key: string, pattern: string, cache: Map<string, boolean>): boolean => {
            const cacheKey = `${key}:${pattern}`;
            return cache.get(cacheKey) ??
                cache.set(cacheKey, new Glob(pattern).match(key)).get(cacheKey)!;
        },

        getTargetPatterns: (config: Config): string[] => {
            return config.hide.flatMap(rule =>
                Array.isArray(rule.target) ? rule.target :
                    rule.target === 'all' ? ['*'] : [rule.target || '*']
            );
        },

        shouldProcessProperty: (
            prop: PropertySignature,
            typeName: string,
            config: Config,
            patternCache: Map<string, boolean>
        ): boolean => {
            return config.hide.some(rule =>
                self.matchesPattern(typeName, self.getTargetPatterns(config), patternCache) &&
                self.matchesPattern(prop.getName(), Array.isArray(rule.field) ? rule.field : [rule.field], patternCache)
            );
        },

        processProperties: (
            properties: PropertySignature[],
            typeName: string,
            config: Config,
            shouldProcessProperty: (prop: PropertySignature, typeName: string) => boolean
        ) => {
            const toModify = properties.filter(prop =>
                !prop.wasForgotten() &&
                Node.isPropertySignature(prop) &&
                shouldProcessProperty(prop, typeName)
            );

            toModify.forEach(prop => {
                if (prop.wasForgotten()) return;
                const text = prop.getText();
                config.action === 'delete'
                    ? prop.remove()
                    : prop.replaceWithText(text.split('\n').map(line => `// ${line}`).join('\n'));
            });
        },

        getInputFiles: async (patterns: string[]): Promise<string[]> => {
            const fileArrays = await Promise.all(
                patterns.map(async pattern => {
                    const results: string[] = [];
                    for await (const file of new Glob(pattern).scan({ absolute: true })) {
                        results.push(file);
                    }
                    return results;
                })
            );
            return Array.from(new Set(fileArrays.flat()));
        }
    });

const self = processorService.processorService;