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

                // Check if we should process this line based on current type
                const shouldProcess = this.config.hide.some(rule => {
                    if (rule.target === 'all') return true;
                    if (!rule.target) return true;
                    const targets = Array.isArray(rule.target) ? rule.target : [rule.target];
                    return targets.some(t => {
                        const g = new Glob(t);
                        return g.match(currentType);
                    });
                });

                if (!shouldProcess) return line;

                // Simple field matching
                for (const rule of this.config.hide) {
                    const fields = Array.isArray(rule.field) ? rule.field : [rule.field];
                    for (const field of fields) {
                        const fieldMatch = line.match(/^\s*(\w+)\??:/);
                        if (fieldMatch && this.matchPattern(fieldMatch[1], field)) {
                            return this.config.action === 'delete' ? '' :
                                '  // ' + line.trim();
                        }
                    }
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
