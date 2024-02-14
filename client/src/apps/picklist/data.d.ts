export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface StatTableData {
    title: string;
    column: string;
    ascending: boolean;
    type: "StatTable";
}

export interface BarGraphData {
    title: string;
    column: string;
    ascending: boolean;
    type: "BarGraph";
}

export interface ScatterPlotData {
    title: string;
    xColumn: string;
    yColumn: string;
    type: "ScatterPlot";
}

export type WindowData = StatTableData | BarGraphData | ScatterPlotData; // | WeightedTableData | BlankTableData | ...
