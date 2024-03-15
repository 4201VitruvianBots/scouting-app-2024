import { CommentValues } from 'requests';
import { TabBase } from '../../components/workspace/workspaceData';

export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
    Comments: Record<CommentValues, number>;
}

export interface StatTableData extends TabBase {
    type: "StatTable";
    columns: string[];
    sortColumn?: string;
    ascending: boolean;
    weighted: boolean;
    weights: number[];
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

export interface StatSummaryData extends TabBase {
    column: string;
    type: "StatSummary";
}

export interface TeamSummaryData extends TabBase {
    teamNumber: number;
    type: "TeamSummary";
}

export type WindowData = StatTableData | BarGraphData | ScatterPlotGraphData | StatSummaryData | TeamSummaryData; // | WeightedTableData | BlankTableData | ...
