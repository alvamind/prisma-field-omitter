import { TypeAliasDeclaration, InterfaceDeclaration, ModuleDeclaration } from 'ts-morph';

export type ProcessableDeclaration = TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration;

export interface Logger {
    info: (msg: string) => void;
    warn: (msg: string) => void;
}

export interface HideRule {
    field: string | string[];
    target?: string | string[] | "all";
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
    [key: string]: unknown;
}

export interface ProcessingOptions {
    configPath: string;
    parallel?: number;
    verbose?: boolean;
}
