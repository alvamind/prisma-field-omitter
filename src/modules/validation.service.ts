import Alvamind from 'alvamind/dist/index.js';
import type { Config } from '../types';
import schema from '../prisma-field-omitter.schema.json';

export const validationService = Alvamind({ name: 'validation.service' })
    .decorate('validationService', {
        isValidOriginFile(value: unknown): boolean {
            if (typeof value === 'string') return true;
            if (Array.isArray(value)) return value.every(item => typeof item === 'string');
            return false;
        },

        validateConfig(config: Config): string[] {
            const errors: string[] = [];

            // Required fields validation
            for (const field of schema.required) {
                const value = config[field as keyof Config];
                if (value === undefined || value === null) {
                    errors.push(`Missing required field: ${field}`);
                }
            }

            // Validate originFile format
            if (config.originFile && !self.isValidOriginFile(config.originFile)) {
                errors.push("originFile must be a string or array of strings");
            }

            // Validate hide rules
            if (config.hide?.length > 0) {
                config.hide.forEach((rule, index) => {
                    // Check required fields first
                    if (!rule.field) {
                        errors.push(`Hide rule #${index + 1}: Missing required field field`);
                        return;
                    }

                    // Validate field format only if it exists
                    if (rule.field && (typeof rule.field !== 'string' && !Array.isArray(rule.field))) {
                        errors.push(`Hide rule #${index + 1}: field must be a string or array of strings`);
                    }

                    // Validate target format
                    if (rule.target && rule.target !== 'all' && !Array.isArray(rule.target)) {
                        errors.push(`Hide rule #${index + 1}: target must be 'all' or array of patterns`);
                    }

                    // Validate on enum
                    if (rule.on && !schema.properties.hide.items.properties.on.enum.includes(rule.on)) {
                        errors.push(`Hide rule #${index + 1}: Invalid 'on' value. Must be ${schema.properties.hide.items.properties.on.enum.join(', ')}`);
                    }
                });
            }

            // Validate action enum
            if (config.action && !schema.properties.action.enum.includes(config.action)) {
                errors.push(`Invalid action value. Must be ${schema.properties.action.enum.join(' or ')}`);
            }

            // Validate generateOmitTypes and its path
            if (config.generateOmitTypes && !config.generatedOmitTypesOutputPath) {
                errors.push("generatedOmitTypesOutputPath is required when generateOmitTypes is true");
            }

            return errors;
        }
    });

const self = validationService.validationService;
