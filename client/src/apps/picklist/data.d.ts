import { TabBase } from '../../components/workspace/workspaceData';

export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface TeamInfoEntry {
    [teamNumber: string]: {
        primaryHex: string;
        secondaryHex: string;
        verified: boolean;
        avatar?: string;
        info?: any;
    };
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

export interface StatSummaryData extends TabBase {
    column: string;
    type: "StatSummary";
}

export interface TeamSummaryData extends TabBase {
    teamNumber: number;
    type: "TeamSummary";
}

export type WindowData = StatTableData | BarGraphData | ScatterPlotGraphData | StatSummaryData | TeamSummaryData; // | WeightedTableData | BlankTableData | ...
