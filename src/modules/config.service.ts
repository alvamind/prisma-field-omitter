import Alvamind, { AlvamindInstance } from 'alvamind/dist/index.js';
import { existsSync, mkdirSync } from 'fs';
import type { Config } from '../types';
import { validationService } from './validation.service';

export const configService: AlvamindInstance = Alvamind({ name: 'config.service' })
  .use(validationService)
  .decorate('configService', {
    async readConfig(configPath: string): Promise<Config> {
      if (!configPath) {
        throw new Error('Config path is required');
      }

      const file = Bun.file(configPath);
      if (!await file.exists()) {
        throw new Error(`Config file not found: ${configPath}`);
      }

      const config = await file.json() as Config;

      const validationErrors = validationService.validationService.validateConfig(config);
      if (validationErrors.length > 0) {
        throw new Error('Configuration validation failed:\n' + validationErrors.join('\n'));
      }

      // Ensure outputDir exists
      if (!existsSync(config.outputDir)) {
        mkdirSync(config.outputDir, { recursive: true });
      }

      return config;
    }
  });
