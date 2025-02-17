import type { ProcessingOptions } from "./types";
import { processorController } from "./modules/processor/processor.controller";

export async function readConfig(configPath: string) {
    const file = Bun.file(configPath);
    return await file.json();
}

export async function run(options: ProcessingOptions) {
    try {
        const config = await readConfig(options.configPath);
        await processorController.process(config);
        console.log('Processing completed successfully!');
    } catch (error) {
        console.error('Error during processing:', error);
        process.exit(1);
    }
}
