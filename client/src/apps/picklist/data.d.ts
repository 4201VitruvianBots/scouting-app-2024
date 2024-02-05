export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface StatTableData {
    title: string;
    column: string;
    ascending: boolean;
    type: 'stat_table';
}

export interface ScatterPlotData {
    title: string;
    xColumn: string;
    yColumn: string;
    type: 'scatter_plot';
}

export type WindowData = StatTableData | ScatterPlotData; // | WeightedTableData | BlankTableData | ...
