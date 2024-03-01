import { TabBase } from '../../components/workspace/workspaceData';

export interface AnalysisEntry extends Record<string, string | number | boolean> {
    teamNumber: number;
}

export interface TeamInfo {
    [teamNumber: string]: {
        primaryHex: string;
        secondaryHex: string;
        verified: boolean;
        avatar?: string;
        info: {
            address: null;
            city: string | null;
            country: string | null;
            gmaps_place_id: null;
            gmaps_url: null;
            home_championship: Record<string, string> | null;
            key: string;
            lat: null;
            lng: null;
            location_name: null;
            motto: null;
            name: string;
            nickname: string;
            postal_code: string;
            rookie_year: number;
            school_name: string;
            state_prov: string;
            team_number: number;
            website: string | null;
        } | {
            Error: string;
        };
    };
};

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
