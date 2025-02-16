import type { Config } from "./types";
import { Project, Node, PropertySignature, SyntaxKind } from "ts-morph";
import { Glob } from "bun";
import { basename, join } from "path";
import { unlinkSync } from "fs";

export class TypeProcessor {
    private project: Project;
    private patternCache = new Map<string, boolean>();

    constructor(private config: Config) {
        this.project = new Project({
            tsConfigFilePath: "tsconfig.json",
            skipAddingFilesFromTsConfig: true,
        });
    }

    async process() {
        const files = await this.getInputFiles();
        await Promise.all(files.map(file => this.processFile(file)));
    }

    private async processFile(file: string) {
        const sourceFile = this.project.addSourceFileAtPath(file);
        const processors = [
            ...sourceFile.getTypeAliases().map(type => ({
                name: type.getName(),
                node: type.getTypeNode(),
                type: 'type' as const
            })),
            ...sourceFile.getInterfaces().map(int => ({
                name: int.getName(),
                node: int,
                type: 'interface' as const
            }))
        ];

        processors.forEach(({ name, node, type }) => {
            if (!this.shouldProcessType(name)) return;

            const properties = type === 'type' && Node.isTypeLiteral(node)
                ? Array.from(node.getProperties())
                : type === 'interface' ? Array.from(node.getProperties()) : [];

            this.processProperties(properties, name);
        });

        const outputPath = join(this.config.outputDir, basename(file));
        await Bun.write(outputPath, sourceFile.getFullText());

        if (this.config.deleteOriginFile) {
            unlinkSync(file);
        }
    }

    private processProperties(properties: PropertySignature[], typeName: string) {
        const propertiesToModify: PropertySignature[] = [];

        properties.forEach(prop => {
            if (!Node.isPropertySignature(prop)) return;

            const fieldName = prop.getName();
            if (this.shouldHideField(fieldName, typeName)) {
                propertiesToModify.push(prop);
            }

            // Process nested types
            prop.getChildrenOfKind(SyntaxKind.TypeLiteral)
                .forEach(child => {
                    if (Node.isTypeLiteral(child)) {
                        this.processProperties(Array.from(child.getMembers() as PropertySignature[]), typeName);
                    }
                });
        });

        propertiesToModify.forEach(prop => this.hideProperty(prop));
    }

    private hideProperty(prop: PropertySignature) {
        const text = prop.getFullText().trim();
        this.config.action === 'delete'
            ? prop.remove()
            : prop.replaceWithText(`// ${text}`);
    }

    private getCachedPattern(key: string, pattern: string): boolean {
        const cacheKey = `${key}:${pattern}`;
        if (!this.patternCache.has(cacheKey)) {
            this.patternCache.set(cacheKey, new Glob(pattern).match(key));
        }
        return this.patternCache.get(cacheKey)!;
    }

    private shouldProcessType(typeName: string): boolean {
        return this.config.hide.some(rule => {
            const targets = Array.isArray(rule.target) ? rule.target :
                rule.target === 'all' ? ['*'] : [rule.target || '*'];

            return targets.some(target => {
                const isNegated = target.startsWith('!');
                const pattern = isNegated ? target.slice(1) : target;
                const matches = this.getCachedPattern(typeName, pattern);
                return isNegated ? !matches : matches;
            });
        });
    }

    private shouldHideField(fieldName: string, typeName: string): boolean {
        return this.config.hide.some(rule =>
            this.shouldProcessType(typeName) &&
            (Array.isArray(rule.field) ? rule.field : [rule.field])
                .some(pattern => {
                    const isNegated = pattern.startsWith('!');
                    const actualPattern = isNegated ? pattern.slice(1) : pattern;
                    const matches = this.getCachedPattern(fieldName, actualPattern);
                    return isNegated ? !matches : matches;
                })
        );
    }

    private async getInputFiles(): Promise<string[]> {
        const patterns = Array.isArray(this.config.originFile)
            ? this.config.originFile
            : [this.config.originFile];

        return Array.from(new Set(
            (await Promise.all(patterns.map(async pattern => {
                const files = [];
                for await (const file of new Glob(pattern).scan({ absolute: true })) {
                    files.push(file);
                }
                return files;
            }))).flat()
        ));
    }
}
