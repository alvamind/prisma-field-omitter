import Alvamind from 'alvamind';

export const progressService = Alvamind({ name: 'progress.service' })
    .decorate('progressService', {
        create: (total: number, label = 'Processing') => {
            let current = 0;
            const width = 40;

            return {
                increment: () => {
                    current++;
                    const percentage = Math.round((current / total) * 100);
                    const filled = Math.round((width * current) / total);
                    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
                    process.stdout.write(`\r${label}: [${bar}] ${percentage}% (${current}/${total})`);

                    if (current === total) {
                        process.stdout.clearLine(0);
                        process.stdout.cursorTo(0);
                    }
                }
            };
        }
    });
