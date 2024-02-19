import base64toImage from '../../../lib/base64toImage';
import { AnalysisEntry, StatColumnData, StatTableData, TeamInfoEntry } from '../data';
import StatColumn from './StatColumn';

function StatTable({
    table,
    data,
    teamInfoJson,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfoEntry;
}) {
    // const entries = data.map<[number, number]>(e => [
    //     e.teamNumber,
    //     e[table.column] as number,
    // ]);
    // const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
    // if (!table.ascending) sortedEntries.reverse();
    
    // Create a list of the avatar data for each team based on the base64 images stored under the key 'avatar' in the team_info.json file
    // const sortedTeamNumbers = sortedEntries.map(entry => entry[0].toString());
    // let sortedTeamAvatars = sortedTeamNumbers.map(() => '');
    
    // const empty64x64Base64: string = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC";
    
    // if (teamInfoJson !== undefined) {
    //     sortedTeamAvatars = sortedTeamNumbers.map(teamNumber => {
    //         if (teamInfoJson[teamNumber]?.avatar !== undefined) {
    //             return teamInfoJson[teamNumber]?.avatar;
    //         } else {
    //             return empty64x64Base64;
    //         }
    //     }).filter(Boolean) as string[];
    // }
    
    // // Convert the base64 images to an array of Image objects
    // const avatarImages = sortedTeamAvatars.map(base64toImage);
    
    let testTable: StatColumnData = {column: 'test', title: 'test', type: 'StatColumn'};
    
    return (
        <div className="flex space-x-4">
            <table>
                <thead className='sticky top-0'>
                    <tr>
                        <th colSpan={2} className="bg-white">{table.title}</th>
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
                    <StatColumn table={testTable} data={data} onClick={() => {}} onSort={() => {}}/>
                </tbody>
            </table>
            <button className="border-black">+ Add Column</button>
        </div>
    );
}

export default StatTable;
