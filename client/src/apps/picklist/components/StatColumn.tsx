import ArrowButton from "../../../components/ArrowButton";
import { AnalysisEntry, StatColumnData } from "../data";

function StatColumn({
    table,
    data,
    onClick,
    onSort,
}: {
    table: StatColumnData,
    data: AnalysisEntry[];
    onClick: (teamNumbers: number[]) => void;
    onSort: (teamNumbers: number[]) => void;
}) {
    let ascending = true;
    
    const entries = data.map<[number, number]>(e => [
        e.teamNumber,
        e[table.column] as number,
    ]);
    const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
    
    if (!ascending) sortedEntries.reverse();
    
    return (
        <table>
            <thead className='sticky top-0'>
                <tr className="bg-gray-300">
                    <ArrowButton onClick={() => {}} onSort={() => {}}/>
                    <th colSpan={2}>{table.title}</th>
                    
                </tr>
            </thead>
            <tbody>
                {/* {sortedEntries.map(([team, datapoint], i) => (
                    <tr key={i}>
                        {avatarImages[i].src ? <td><img src={avatarImages[i].src} width='32' height='32' /></td> : <td></td>}
                        <td>{team}</td>
                        <td>{datapoint}</td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    );
}

export default StatColumn;