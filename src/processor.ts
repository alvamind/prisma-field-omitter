import * as ts from "typescript";
import type { Config } from "./types";
import { Glob } from "bun";
import { basename, join } from "path";
import { unlinkSync } from "fs";

export class TypeProcessor {
    private config: Config;

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

            const result = ts.transform(sourceFile, [(context) => {
                return (node: ts.SourceFile) => ts.visitEachChild(node, child => this.visitNode(child), context);
            }]);

            if (result.transformed.length > 0) {
                const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
                const output = printer.printFile(result.transformed[0] as ts.SourceFile);

                const outputPath = join(this.config.outputDir, basename(file));
                await Bun.write(outputPath, output);

                if (this.config.deleteOriginFile) {
                    unlinkSync(file);
                }
            }
        }
    }

    private visitNode(node: ts.Node): ts.Node {
        if (!ts.isTypeAliasDeclaration(node) && !ts.isInterfaceDeclaration(node)) {
            return node;
        }

        const nodeName = node.name.text;
        const shouldProcess = this.config.hide.some(rule => {
            const targets = rule.target === 'all' ? ['.*'] :
                Array.isArray(rule.target) ? rule.target : [rule.target || '.*'];

            return targets.some(target => {
                const pattern = new Glob(target);
                return pattern.match(nodeName);
            });
        });

        if (!shouldProcess) return node;

        if (this.config.action === 'delete') {
            return this.processNodeForDeletion(node);
        }

        // Comment action
        return ts.addSyntheticLeadingComment(
            node,
            ts.SyntaxKind.SingleLineCommentTrivia,
            ` ${node.getText()}`,
            true
        );
    }

    private processNodeForDeletion(node: ts.TypeAliasDeclaration | ts.InterfaceDeclaration): ts.Node {
        const fieldsToHide = new Set(
            this.config.hide
                .flatMap(rule => Array.isArray(rule.field) ? rule.field : [rule.field])
                .filter(field => field !== '*')
        );

        if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
            const members = node.type.members.filter(member => {
                if (ts.isPropertySignature(member) && member.name) {
                    const name = member.name.getText();
                    return !this.shouldHideField(name, fieldsToHide);
                }
                return true;
            });

            return ts.factory.updateTypeAliasDeclaration(
                node,
                node.modifiers,
                node.name,
                node.typeParameters,
                ts.factory.createTypeLiteralNode(members)
            );
        }

        return node;
    }

    private shouldHideField(fieldName: string, patterns: Set<string>): boolean {
        return Array.from(patterns).some(pattern => {
            const glob = new Glob(pattern);
            return glob.match(fieldName);
        });
    }

    private async getInputFiles(): Promise<string[]> {
        const patterns = Array.isArray(this.config.originFile)
            ? this.config.originFile
            : [this.config.originFile];

        const files = new Set<string>();
        for (const pattern of patterns) {
            const glob = new Glob(pattern);
            for await (const file of glob.scan({ absolute: true })) {
                files.add(file);
            }
        }
        return Array.from(files);
    }
}
