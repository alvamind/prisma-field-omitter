export interface Config {
    originFile: string | string[]; // Now supports glob patterns
    outputDir: string; // Changed from outputFile to outputDir
    deleteOriginFile?: boolean;
    action?: 'comment' | 'delete';
    generateOmitTypes?: boolean;
    generatedOmitTypesOutputPath?: string;
    hide: Array<{
        field: string | string[];
        target?: 'all' | string[];
        on?: 'input' | 'output' | 'both';
    }>;
    [key: string]: unknown;  // Add index signature
}

export interface ProcessingOptions {
    configPath: string;
    parallel?: number;
    verbose?: boolean;
}
