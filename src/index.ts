import Alvamind from 'alvamind';
import { existsSync, mkdirSync } from 'fs';
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
    if (!configPath) {
        throw new Error('Config path is required');
    }
    const file = Bun.file(configPath);
    if (!await file.exists()) {
        throw new Error(`Config file not found: ${configPath}`);
    }
    const config = await file.json() as Config;

    // Ensure outputDir exists
    if (!existsSync(config.outputDir)) {
        mkdirSync(config.outputDir, { recursive: true });
    }

    return config;
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const configIndex = args.indexOf('--config');

    if (configIndex === -1 || !args[configIndex + 1]) {
        console.error('Error: --config option is required');
        process.exit(1);
    }

    const options: ProcessingOptions = {
        configPath: args[configIndex + 1],
        verbose: args.includes('--verbose')
    };

    run(options).catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

// Export for testing
export { run };
