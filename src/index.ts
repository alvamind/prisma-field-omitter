import Alvamind from 'alvamind';
import { processorController } from './modules/processor/processor.controller';
import type { Config, ProcessingOptions } from './types';

const app = Alvamind({ name: 'prisma-field-omitter' })
    .use(processorController)
    .derive(({ processorController }) => ({
        run: async (options: ProcessingOptions) => {
            try {
                console.log('Starting prisma-field-omitter...');
                const config = await readConfig(options.configPath);
                const startTime = Date.now();

                await processorController.process(config);

                const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                console.log(`Processing completed successfully in ${duration}s!`);
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
