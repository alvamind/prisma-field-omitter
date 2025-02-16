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
            const text = await Bun.file(file).text();
            const lines = text.split("\n");
            let currentType = '';

            const processedLines = lines.map(line => {
                // Track type/interface declarations
                const typeMatch = line.match(/export (type|interface) (\w+)/);
                if (typeMatch) {
                    currentType = typeMatch[2];
                    return line;
                }

                // Check if this line is inside a type we want to process
                const shouldProcess = this.config.hide.some(rule => {
                    const targets = rule.target === 'all' ? ['*'] :
                        Array.isArray(rule.target) ? rule.target : [rule.target || '*'];

                    return targets.some(target => new Glob(target).match(currentType));
                });

                if (!shouldProcess) return line;

                // Check if this line has a field we want to process
                const fieldMatch = line.match(/^\s*(\w+)\??:/);
                if (!fieldMatch) return line;

                const fieldName = fieldMatch[1];
                const shouldHideField = this.config.hide.some(rule => {
                    const fields = Array.isArray(rule.field) ? rule.field : [rule.field];
                    return fields.some(pattern => new Glob(pattern).match(fieldName));
                });

                if (shouldHideField) {
                    return this.config.action === 'delete' ? '' : '  // ' + line.trim();
                }

                return line;
            });

            const output = processedLines.filter(l => l !== "").join("\n");
            const outputPath = join(this.config.outputDir, basename(file));
            await Bun.write(outputPath, output);

            if (this.config.deleteOriginFile) {
                unlinkSync(file);
            }
        }
    }

    private matchPattern(str: string, pattern: string): boolean {
        const regex = pattern
            .replace(/\*/g, '.*')
            .replace(/\?/g, '.')
            .replace(/\[!\]/g, '[^]');
        return new RegExp(`^${regex}$`).test(str);
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
