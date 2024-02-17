import { ChartShallowDataShape, ScatterPlot } from 'reaviz';
import { AnalysisEntry, ScatterPlotGraphData, TeamInfoEntry } from '../data';

function ScatterPlotGraph({
    table,
    data,
    teamInfoJson,
}: {
    table: ScatterPlotGraphData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfoEntry;
}) {
    const plotData: ChartShallowDataShape[] = data.map(e => {
        return {
            key: e.teamNumber.toString(),
            data: [e[table.xColumn] as number, e[table.yColumn] as number],
        };
    });
    
    return <ScatterPlot data={plotData} />;
}

export default ScatterPlotGraph;