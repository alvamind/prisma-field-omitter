import Alvamind from 'alvamind';

export const progressService = Alvamind({ name: 'progress.service' })
    .decorate('progressService', {
        createFieldProgress: (totalFields: number) => {
            let current = 0;
            const width = 40;
            let lastLineLength = 0;

            const render = () => {
                const percentage = totalFields === 0 ? 100 : Math.round((current / totalFields) * 100);
                const filled = Math.round((width * current) / totalFields);
                const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
                const line = `[${bar}] ${percentage}% (${current}/${totalFields})`;
                process.stdout.write(`\r${line}`);
                lastLineLength = line.length;
            };

            return {
                increment: (by: number = 1) => {
                    current += by;
                    if (current > totalFields) current = totalFields;
                    render();
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