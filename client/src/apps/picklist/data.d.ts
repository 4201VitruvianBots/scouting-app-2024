export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface SimpleTable {
    title: string;
    column: string;
    ascending: boolean;
}
