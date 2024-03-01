import { ChartShallowDataShape, ScatterPlot } from 'reaviz';
import { AnalysisEntry, ScatterPlotGraphData, TeamInfo } from '../data';

function ScatterPlotGraph({
    table,
    data,
}: {
    table: ScatterPlotGraphData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfo;
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
