export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface StatTableData {
    title: string;
    column: string;
    ascending: boolean;
}

export type TableData = StatTableData; // | WeightedTableData | BlankTableData | ...
