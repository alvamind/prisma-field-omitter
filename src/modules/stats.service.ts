import Alvamind from 'alvamind';

export interface ProcessingStats {
    filesProcessed: number;
    typesModified: number;
    fieldsModified: number;
    processedFiles?: Set<string>;
}

export const statsService = Alvamind({ name: 'stats.service' })
    .decorate('statsService', {
        createStats: (): ProcessingStats => ({
            filesProcessed: 0,
            typesModified: 0,
            fieldsModified: 0,
            processedFiles: new Set()
        })
    });
