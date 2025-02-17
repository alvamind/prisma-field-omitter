import type { Config } from "./types";
import { Project, Node, PropertySignature } from "ts-morph";
import { Glob } from "bun";
import { basename, join } from "path";

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
        const declarations = [
            ...sourceFile.getTypeAliases(),
            ...sourceFile.getInterfaces()
        ];

        declarations.forEach(decl => {
            const name = decl.getName();
            if (!this.matchesPattern(name, this.getTargetPatterns())) return;

            const node = 'getTypeNode' in decl ? decl.getTypeNode() : decl;
            const properties = Node.isTypeLiteral(node) || Node.isInterfaceDeclaration(node)
                ? Array.from(node.getProperties())
                : [];

            this.processProperties(properties, name);
        });

        await Bun.write(
            join(this.config.outputDir, basename(file)),
            sourceFile.getFullText()
        );

        this.config.deleteOriginFile && sourceFile.delete();
    }

    private processProperties(properties: PropertySignature[], typeName: string) {
        const toModify = properties.filter(prop =>
            !prop.wasForgotten() &&
            Node.isPropertySignature(prop) &&
            this.shouldProcessProperty(prop, typeName)
        );

        toModify.forEach(prop => {
            if (prop.wasForgotten()) return;

            if (this.config.action === 'delete') {
                prop.remove();
            } else {
                // Handle commenting more carefully
                const lines = prop.getText().split('\n');
                const indentation = lines[0].match(/^\s*/)?.[0] || '';
                const commentedLines = lines.map(line =>
                    line ? `${indentation}// ${line.trim()}` : line
                );
                prop.replaceWithText(commentedLines.join('\n'));
            }
        });
    }

    private shouldProcessProperty(prop: PropertySignature, typeName: string): boolean {
        const propertyName = prop.getName();
        return this.shouldHideField(propertyName, typeName);
    }

    private processNestedProperties(prop: PropertySignature, typeName: string) {
        const typeNode = prop.getTypeNode();
        if (!typeNode) return;

        if (Node.isTypeLiteral(typeNode)) {
            const nestedProps = typeNode.getProperties();
            if (nestedProps.length > 0) {
                this.processProperties(nestedProps as PropertySignature[], typeName);
            }
        } else if (Node.isIntersectionTypeNode(typeNode) || Node.isUnionTypeNode(typeNode)) {
            typeNode.getTypeNodes().forEach(node => {
                if (Node.isTypeLiteral(node)) {
                    const nestedProps = node.getProperties();
                    this.processProperties(nestedProps as PropertySignature[], typeName);
                }
            });
        }
    }

    private hasHiddenNestedFields(prop: PropertySignature, typeName: string): boolean {
        const typeNode = prop.getTypeNode();
        if (!typeNode) return false;

        if (Node.isTypeLiteral(typeNode)) {
            return this.checkNestedTypeNode(typeNode, typeName);
        } else if (Node.isIntersectionTypeNode(typeNode) || Node.isUnionTypeNode(typeNode)) {
            return typeNode.getTypeNodes().some(node =>
                Node.isTypeLiteral(node) && this.checkNestedTypeNode(node, typeName)
            );
        }
        return false;
    }

    private checkNestedTypeNode(typeNode: Node, typeName: string): boolean {
        if (!Node.isTypeLiteral(typeNode)) return false;

        return typeNode.getProperties().some(nested => {
            if (!Node.isPropertySignature(nested)) return false;

            const shouldHide = this.shouldHideField(nested.getName(), typeName);
            if (shouldHide) return true;

            const nestedType = nested.getTypeNode();
            if (nestedType && Node.isTypeLiteral(nestedType)) {
                return this.checkNestedTypeNode(nestedType, typeName);
            }
            return false;
        });
    }

    private matchesPattern(value: string, patterns: string[]): boolean {
        return patterns.some(pattern => {
            const isNegated = pattern.startsWith('!');
            const actualPattern = isNegated ? pattern.slice(1) : pattern;
            const matches = this.getCachedPattern(value, actualPattern);
            return isNegated ? !matches : matches;
        });
    }

    private getCachedPattern(key: string, pattern: string): boolean {
        const cacheKey = `${key}:${pattern}`;
        if (!this.patternCache.has(cacheKey)) {
            try {
                const matches = new Glob(pattern).match(key);
                this.patternCache.set(cacheKey, matches);
            } catch {
                this.patternCache.set(cacheKey, false);
            }
        }
        return this.patternCache.get(cacheKey)!;
    }

    private getTargetPatterns(): string[] {
        return this.config.hide.flatMap(rule =>
            Array.isArray(rule.target) ? rule.target :
                rule.target === 'all' ? ['*'] : [rule.target || '*']
        );
    }

    private shouldHideField(fieldName: string, typeName: string): boolean {
        return this.config.hide.some(rule =>
            this.matchesPattern(typeName, this.getTargetPatterns()) &&
            this.matchesPattern(fieldName, Array.isArray(rule.field) ? rule.field : [rule.field])
        );
    }

    private async getInputFiles(): Promise<string[]> {
        const patterns = Array.isArray(this.config.originFile)
            ? this.config.originFile
            : [this.config.originFile];

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
}
