import { TabBase } from '../../components/workspace/workspaceData';

export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface StatTableData extends TabBase {
    column: string;
    ascending: boolean;
    type: "StatTable";
}

export interface BarGraphData extends TabBase {
    column: string;
    ascending: boolean;
    top: number;
    type: "BarGraph";
}

export interface ScatterPlotGraphData extends TabBase {
    xColumn: string;
    yColumn: string;
    type: "ScatterPlotGraph";
}

export type WindowData = StatTableData | BarGraphData | ScatterPlotGraphData; // | WeightedTableData | BlankTableData | ...
