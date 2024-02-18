import base64toImage from '../../../lib/base64toImage';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { AnalysisEntry, TeamSummaryData, TeamInfoEntry } from '../data';

function TeamSummary({
    table,
    data,
    teamInfoJson,
}: {
    table: TeamSummaryData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfoEntry;
}) {
    
    // Get the data for the team specified
    const teamData = data.filter(e => e.teamNumber === table.teamNumber);
    
    try {
        // Get the team info for the team specified 
        const teamInfo = teamInfoJson[table.teamNumber.toString()].info;
        
        let teamAvatar = undefined;
        
        if (teamInfoJson[table.teamNumber.toString()].avatar) {
            teamAvatar = base64toImage(teamInfoJson[table.teamNumber.toString()].avatar || "");
        }
        
        return (
            <div className="flex space-x-10">
                <div>
                    <div className="flex space-x-4">
                        {teamAvatar && <img src={teamAvatar.src} />}
                        <h1 className="text-3xl">Team {teamInfo.team_number} - {teamInfo.nickname}</h1>
                    </div>
                    
                    <p className="text-gray-500 max-w-md">{teamInfo.name}</p>
                    <br />
                    
                    <div className="flex space-x-4">
                        <p>From {teamInfo.city}, {teamInfo.state_prov}, {teamInfo.country}</p>
                        <p>Rookie Year: {teamInfo.rookie_year}</p>
                    </div>
                    
                    <br />
                </div>
                
                <div>
                    <h2 className="text-2xl">Stats</h2>
                    <p>Matches Played: {teamData.length}</p>
                    <p>Wins: {teamData.filter(e => e.wins).length}</p>
                    <p>Losses: {teamData.filter(e => !e.wins).length}</p>
                    
                    <br />
                    
                    {Object.keys(teamData[0]).map(e => {
                        if (e !== "teamNumber" && e !== "scouterName" && e !== "climb") {
                            return (
                                <p key={e}>
                                    {camelToSpaced(e)}: {teamData.map(e2 => Number(e2[e])).reduce((a, b) => a + b)}
                                </p>
                            );
                        }
                    })}
                
                </div>
            </div>
        );
    } catch (e) {
        return (
            <div className="flex space-x-10">
                <div>
                    <h1 className="text-3xl">Team {table.teamNumber}</h1>
                </div>
                
                <div>
                    <h2 className="text-2xl">Stats</h2>
                    <p>Matches Played: {teamData.length}</p>
                    <p>Wins: {teamData.filter(e => e.wins).length}</p>
                    <p>Losses: {teamData.filter(e => !e.wins).length}</p>
                    
                    <br />
                    
                    {Object.keys(teamData[0]).map(e => {
                        if (e !== "teamNumber" && e !== "scouterName" && e !== "climb") {
                            return (
                                <p key={e}>
                                    {camelToSpaced(e)}: {teamData.map(e2 => Number(e2[e])).reduce((a, b) => a + b)}
                                </p>
                            );
                        }
                    })}
                
                </div>
            </div>
        );
    }
}

export default TeamSummary;
