import Alvamind from 'alvamind/dist/index.js';

export interface ProcessingStats {
    filesProcessed: number;
    typesModified: number;
    fieldsModified: number;
}

export const statsService = Alvamind({ name: 'stats.service' })
    .decorate('statsService', {
        createStats: (): ProcessingStats => ({
            filesProcessed: 0,
            typesModified: 0,
            fieldsModified: 0
        })
    });
