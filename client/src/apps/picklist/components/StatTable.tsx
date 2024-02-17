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
    
    const emptyBase64: string =  "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC";
    
    if (teamAvatarsJson !== undefined) {
        sortedTeamAvatars = sortedTeamNumbers.map(teamNumber => {
            if (teamAvatarsJson[teamNumber]?.avatar !== undefined) {
                return teamAvatarsJson[teamNumber]?.avatar;
            } else {
                return emptyBase64;
            }
        }).filter(Boolean) as string[];
    }
    
    // Convert the base64 images to an array of Image objects
    let avatarImages: HTMLImageElement[] = [];
    sortedTeamAvatars.forEach((avatar, i) => {
        avatarImages[i] = new Image();
        // Convert base64 to blob
        const byteCharacters = atob(avatar);
        const byteNumbers = new Array(byteCharacters.length);
        for (let j = 0; j < byteCharacters.length; j++) {
            byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/png'});
        avatarImages[i].src = URL.createObjectURL(blob);
    });
    
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
                        <td><img src={avatarImages[i].src} width='32' height='32' /></td>
                        <td>{team}</td>
                        <td>{datapoint}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StatTable;
