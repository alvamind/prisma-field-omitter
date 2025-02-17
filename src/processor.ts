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
            (this.shouldHideField(prop.getName(), typeName) || this.hasHiddenNestedFields(prop, typeName))
        );

        toModify.forEach(prop => {
            if (prop.wasForgotten()) return;
            const text = prop.getText();
            this.config.action === 'delete'
                ? prop.remove()
                : prop.replaceWithText(text.split('\n').map(line => `// ${line}`).join('\n'));
        });
    }

    private hasHiddenNestedFields(prop: PropertySignature, typeName: string): boolean {
        const typeNode = prop.getTypeNode();
        if (!typeNode || !Node.isTypeLiteral(typeNode)) return false;

        return typeNode.getProperties().some(nested =>
            this.shouldHideField(nested.getName(), typeName)
        );
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
        return this.patternCache.get(cacheKey) ??
            this.patternCache.set(cacheKey, new Glob(pattern).match(key)).get(cacheKey)!;
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
