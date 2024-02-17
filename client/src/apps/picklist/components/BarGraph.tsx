import { BarChart, ChartDataShape } from 'reaviz';
import { AnalysisEntry, BarGraphData } from '../data';

function BarGraph({
    table,
    data,
}: {
    table: BarGraphData;
    data: AnalysisEntry[];
}) {
    const entries = data.map<ChartDataShape>(e => {return {key: e.teamNumber.toString(), data: e[table.column] as number}});
    const sortedEntries = entries.sort((a, b) => (a.data as number) - (b.data as number));
    if (!table.ascending) sortedEntries.reverse();
    
    if (table.top < sortedEntries.length) {
        sortedEntries.splice(table.top);
    }

    return <BarChart data={entries} />;
}

export default BarGraph;