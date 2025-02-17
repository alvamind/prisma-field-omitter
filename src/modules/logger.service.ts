import Alvamind from 'alvamind';
import chalk from 'chalk';

export const loggerService = Alvamind({ name: 'logger.service' })
    .decorate('loggerService', {
        info: (message: string) => console.log(chalk.blue(message)),
        error: (message: string, error?: unknown) => {
            console.error(chalk.red(message));
            if (error) console.error(chalk.red(String(error)));
        },
        warn: (message: string) => console.warn(chalk.yellow(message)),
        success: (message: string) => console.log(chalk.green(message))
    });
