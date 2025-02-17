import Alvamind from 'alvamind';
import { processorController } from './modules/processor/processor.controller';
import type { Config, ProcessingOptions } from './types';
import { run } from "./cli";

Alvamind({ name: 'prisma-field-omitter' })
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

if (import.meta.main) {
    const args = process.argv.slice(2);
    const configIndex = args.indexOf('--config');

    if (configIndex === -1 || !args[configIndex + 1]) {
        console.error('Error: --config option is required');
        process.exit(1);
    }

    const configPath = args[configIndex + 1];

    run({
        configPath,
        verbose: args.includes('--verbose')
    }).catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

// Export for testing
export { run };
