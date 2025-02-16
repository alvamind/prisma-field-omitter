import type { ProcessingOptions, Config } from "./types";
import { TypeProcessor } from "./processor";

async function readConfig(configPath: string): Promise<Config> {
    const file = Bun.file(configPath);
    return await file.json() as Config;
}

export async function run(options: ProcessingOptions) {
    try {
        const config = await readConfig(options.configPath);
        const processor = new TypeProcessor(config);
        await processor.process();

        console.log('Processing completed successfully!');
    } catch (error) {
        console.error('Error during processing:', error);
        process.exit(1);
    }
}
