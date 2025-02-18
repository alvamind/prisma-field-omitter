import Alvamind from 'alvamind';

export const progressService = Alvamind({ name: 'progress.service' })
    .decorate('progressService', {
        create: (total: number) => {
            let current = 0;
            const width = 40;
            let lastLineLength = 0;


            return {
                increment: () => {
                    current++;
                    const percentage = Math.round((current / total) * 100);
                    const filled = Math.round((width * current) / total);
                    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
                    const line = `[${bar}] ${percentage}% (${current}/${total})`;

                    process.stdout.write(`\r${line}`);
                    lastLineLength = line.length;
                },

                clear: () => {
                    if (lastLineLength) {
                        process.stdout.write('\r' + ' '.repeat(lastLineLength) + '\r');
                        lastLineLength = 0;
                    }
                }
            };
        }
    });