import Alvamind from 'alvamind';
import { processorController } from './modules/processor/processor.controller';
import type { Config, ProcessingOptions } from './types';

const app = Alvamind({ name: 'prisma-field-omitter' })
    .use(processorController)
    .derive(({ processorController }) => ({
        run: async (options: ProcessingOptions) => {
            try {
                const config = await readConfig(options.configPath);
                await processorController.process(config);
                console.log('Processing completed successfully!');
            } catch (error) {
                console.error('Error during processing:', error);
                process.exit(1);
            }
        }
    }));

async function readConfig(configPath: string): Promise<Config> {
    const file = Bun.file(configPath);
    return await file.json() as Config;
}

const args = process.argv.slice(2);
app.run({
    configPath: args[0] || "prisma-field-omitter.config.json",
    parallel: parseInt(process.env.PARALLEL || String(navigator.hardwareConcurrency)),
    verbose: process.env.VERBOSE === "true"
}).catch(console.error);
