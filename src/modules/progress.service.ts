import Alvamind from 'alvamind';

export const progressService = Alvamind({ name: 'progress.service' })
    .decorate('progressService', {
        create: (total: number, label = 'Processing') => {
            let current = 0;
            const width = 40;
            let lastLineLength = 0;

            const clearLine = () => {
                if (lastLineLength) {
                    process.stdout.write('\r' + ' '.repeat(lastLineLength) + '\r');
                    lastLineLength = 0;
                }
            };

            return {
                increment: () => {
                    current++;
                    const percentage = Math.round((current / total) * 100);
                    const filled = Math.round((width * current) / total);
                    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
                    const line = `${label}: [${bar}] ${percentage}% (${current}/${total})`;

                    clearLine();
                    process.stdout.write(line);
                    lastLineLength = line.length;

                    if (current === total) {
                        clearLine();
                        process.stdout.write('\n');
                    }
                },

                clear: () => {
                    clearLine();
                }
            };
        }
    });