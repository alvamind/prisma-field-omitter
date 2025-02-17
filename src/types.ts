export interface HideRule {
    field: string | string[];
    target?: "all" | string[];
    on?: "input" | "output" | "both";
}

export interface Config {
    originFile: string | string[];
    outputDir: string;
    deleteOriginFile?: boolean;
    action?: "comment" | "delete";
    generateOmitTypes?: boolean;
    generatedOmitTypesOutputPath?: string;
    hide: HideRule[];
    [key: string]: unknown;  // Add index signature
}

export interface ProcessingOptions {
    configPath: string;
    parallel?: number;
    verbose?: boolean;
}
