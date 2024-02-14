import { BarChart } from 'reaviz';
import { AnalysisEntry, BarGraphData } from '../data';

function BarGraph({
    table,
    data,
}: {
    table: BarGraphData;
    data: AnalysisEntry[];
}) {
    const entries = data.map<[number, number]>(e => [
        e.teamNumber,
        e[table.column] as number,
    ]);
    const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
    if (!table.ascending) sortedEntries.reverse();
    
    const testData = [
        {key: "A", data: 10},
        {key: "B", data: 20},
        {key: "C", data: 30},
    ]

    return (
        <BarChart width={600} height={300} data={testData} />
    );
}

export default BarGraph;