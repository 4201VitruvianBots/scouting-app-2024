import { ChartShallowDataShape, ScatterPlot } from 'reaviz';
import { AnalysisEntry, ScatterPlotGraphData } from '../data';
import { TeamData } from 'requests';

function ScatterPlotGraph({
    table,
    data,
}: {
    table: ScatterPlotGraphData;
    data: AnalysisEntry[];
    teamInfoJson: TeamData;
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
