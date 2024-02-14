import { ScatterPlot } from 'reaviz';
import { AnalysisEntry, ScatterPlotData } from '../data';

function ScatterPlotGraph({
    table,
    data,
}: {
    table: ScatterPlotData;
    data: AnalysisEntry[];
}) {
    
    return <ScatterPlot />;
}

export default ScatterPlotGraph;