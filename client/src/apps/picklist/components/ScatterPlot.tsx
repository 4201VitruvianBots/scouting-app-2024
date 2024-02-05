import { AnalysisEntry, ScatterPlotData } from '../data';

function ScatterPlot({
    value,
    // data,
}: {
    value: ScatterPlotData;
    data: AnalysisEntry[];
}) {
    return JSON.stringify(value);
}

export default ScatterPlot;
