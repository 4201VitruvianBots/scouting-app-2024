import { AnalysisEntry, StatTableData } from '../data';

function StatTable({
    table,
    data,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
}) {
    const entries = data.map<[number, number]>(e => [
        e.teamNumber,
        e[table.column] as number,
    ]);
    const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
    if (!table.ascending) sortedEntries.reverse();

    return (
        <table className='block overflow-y-auto'>
            <thead className='sticky top-0'>
                <tr>
                    <th colSpan={2}>{table.title}</th>
                </tr>
            </thead>
            <tbody>
                {sortedEntries.map(([team, datapoint], i) => (
                    <tr key={i}>
                        <td>{team}</td>
                        <td>{datapoint}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StatTable;
