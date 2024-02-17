import base64toImage from '../../../lib/base64toImage';
import { useFetchJson } from '../../../lib/useFetchJson';
import { AnalysisEntry, StatTableData, TeamColorEntry } from '../data';

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
    
    // Create a list of the avatar data for each team based on the base64 images stored under the key 'avatar' in the team_colors.json file
    const teamAvatarsJson = useFetchJson<TeamColorEntry>('/team_colors.json');
    const sortedTeamNumbers = sortedEntries.map(entry => entry[0].toString());
    let sortedTeamAvatars = sortedTeamNumbers.map(() => '');
    
    const empty64x64Base64: string = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC";
    
    if (teamAvatarsJson !== undefined) {
        sortedTeamAvatars = sortedTeamNumbers.map(teamNumber => {
            if (teamAvatarsJson[teamNumber]?.avatar !== undefined) {
                return teamAvatarsJson[teamNumber]?.avatar;
            } else {
                return empty64x64Base64;
            }
        }).filter(Boolean) as string[];
    }
    
    // Convert the base64 images to an array of Image objects
    const avatarImages = sortedTeamAvatars.map(base64toImage);
    
    return (
        <table>
            <thead className='sticky top-0'>
                <tr>
                    <th colSpan={2} className="bg-white">{table.title}</th>
                </tr>
            </thead>
            <tbody>
                {sortedEntries.map(([team, datapoint], i) => (
                    <tr key={i}>
                        {avatarImages[i].src ? <td><img src={avatarImages[i].src} width='32' height='32' /></td> : <td></td>}
                        <td>{team}</td>
                        <td>{datapoint}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StatTable;
