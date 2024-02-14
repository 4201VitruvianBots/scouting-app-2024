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

export interface ScatterPlotGraphData {
    title: string;
    xColumn: string;
    yColumn: string;
    type: "ScatterPlotGraph";
}

export type WindowData = StatTableData | BarGraphData | ScatterPlotGraphData; // | WeightedTableData | BlankTableData | ...
