import * as ts from "typescript";
import type { Config } from "./types";
import { Glob } from "bun";
import { basename, join } from "path";
import { unlinkSync } from "fs";

export class TypeProcessor {
    private config: Config;
    private context!: ts.TransformationContext; // Use definite assignment assertion

    constructor(config: Config) {
        this.config = config;
    }

    async process() {
        const files = await this.getInputFiles();

        for (const file of files) {
            const sourceText = await Bun.file(file).text();
            const sourceFile = ts.createSourceFile(
                file,
                sourceText,
                ts.ScriptTarget.Latest,
                true
            );

            const { transformed, hasChanges } = this.transformNodes(sourceFile);

            if (hasChanges) {
                const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
                const result = printer.printNode(
                    ts.EmitHint.Unspecified,
                    transformed,
                    sourceFile
                );

                const outputPath = this.getOutputPath(file);
                await Bun.write(outputPath, result);

                if (this.config.deleteOriginFile) {
                    unlinkSync(file);
                }
            }
        }
    }

    private transformNodes(sourceFile: ts.SourceFile) {
        let hasChanges = false;

        const visitor = (node: ts.Node): ts.Node => {
            if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
                if (this.shouldHideNode(node)) {
                    hasChanges = true;
                    if (this.config.action === 'comment') {
                        return ts.addSyntheticLeadingComment(
                            node,
                            ts.SyntaxKind.SingleLineCommentTrivia,
                            ` ${node.getText()}`,
                            true
                        );
                    }
                    return ts.factory.createEmptyStatement();
                }
            }
            return ts.visitEachChild(node, visitor, this.context);
        };

        const result = ts.transform(sourceFile, [
            (context): ts.Transformer<ts.SourceFile> => {
                this.context = context;
                return (file) => ts.visitNode(file, visitor) as ts.SourceFile;
            }
        ]);

        return { transformed: result.transformed[0], hasChanges };
    }

    private shouldHideNode(node: ts.TypeAliasDeclaration | ts.InterfaceDeclaration): boolean {
        const text = node.getText();
        return this.config.hide.some(rule => {
            const fields = Array.isArray(rule.field) ? rule.field : [rule.field];
            const targets = rule.target === 'all' ? ['.*'] : rule.target || ['.*'];

            return fields.some(field => {
                const fieldPattern = new RegExp(field.replace('*', '.*'));
                return targets.some(target => {
                    const targetPattern = new RegExp(target.replace('*', '.*'));
                    return fieldPattern.test(text) && targetPattern.test(text);
                });
            });
        });
    }

    private async getInputFiles(): Promise<string[]> {
        const patterns = Array.isArray(this.config.originFile)
            ? this.config.originFile
            : [this.config.originFile];

        const files = new Set<string>();

        for (const pattern of patterns) {
            const glob = new Glob(pattern);
            for await (const file of glob.scan(".")) {
                files.add(file);
            }
        }

        return Array.from(files);
    }

    private getOutputPath(inputPath: string): string {
        const fileName = basename(inputPath);
        return join(this.config.outputDir, fileName);
    }
}
