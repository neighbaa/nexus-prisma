type DiagnosticInfo = {
    title: string;
    code: string;
    reason: string;
    consequence: string;
    solution?: string;
    disable?: string;
};
export declare const renderList: (items: string[]) => string;
export declare const renderTitle: (title: string) => string;
export declare const showWarning: (params: DiagnosticInfo) => void;
export declare function renderError(params: DiagnosticInfo): string;
export declare function renderWarning(params: DiagnosticInfo): string;
export declare const renderCodeInline: (code: string) => string;
export declare const renderCodeBlock: (code: string) => string;
export {};
