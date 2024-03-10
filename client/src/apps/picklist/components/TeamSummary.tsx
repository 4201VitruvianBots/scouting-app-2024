import base64toImage from '../../../lib/base64toImage';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { AnalysisEntry, TeamSummaryData } from '../data';
import { TeamData } from 'requests';

function TeamSummary({
    table,
    data,
    teamInfoJson,
}: {
    table: TeamSummaryData;
    data: AnalysisEntry[];
    teamInfoJson: TeamData;
}) {
    // Get the data for the team specified
    const teamData = data.filter(e => e.teamNumber === table.teamNumber);
    
    let teamInfo;
    let teamAvatar = undefined;
    
    try {
        // Get the team info for the team specified
        teamInfo = teamInfoJson[table.teamNumber.toString()].info;
        if (teamInfoJson[table.teamNumber.toString()].avatar) {
            teamAvatar = base64toImage(
                teamInfoJson[table.teamNumber.toString()].avatar || ''
            );
        }
    } catch (e) {
        teamInfo = {Error: "Team info not found"};
    }
    
    if ('Error' in teamInfo) {
        return (
            <div className='flex space-x-10'>
                <div>
                    <h1 className='text-3xl'>Team {table.teamNumber}</h1>
                    
                    <br />
                    
                    <img src={`/image/${table.teamNumber}.jpeg`} width="400"/>
                </div>

                <div>
                    <h2 className='text-2xl'>Stats</h2>

                    {Object.keys(teamData[0]).map(e => {
                        if (
                            e !== 'teamNumber' &&
                            e !== 'scouterName' &&
                            e !== 'climb'
                        ) {
                            return (
                                <p key={e}>
                                    {camelToSpaced(e)}:{' '}
                                    {teamData
                                        .map(e2 => Number(e2[e]))
                                        .reduce((a, b) => a + b)}
                                </p>
                            );
                        }
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className='flex space-x-10'>
                <div>
                    <div className='flex space-x-4'>
                        {teamAvatar && <img src={teamAvatar.src} />}
                        <h1 className='text-3xl'>
                            Team {teamInfo.team_number} - {teamInfo.nickname}
                        </h1>
                    </div>

                    <p className='max-w-md text-gray-500'>{teamInfo.name}</p>
                    <br />

                    <div className='flex space-x-4'>
                        <p>
                            From {teamInfo.city}, {teamInfo.state_prov},{' '}
                            {teamInfo.country}
                        </p>
                        <p>Rookie Year: {teamInfo.rookie_year}</p>
                    </div>

                    <br />
                    
                    <img src={`/image/${table.teamNumber}.jpeg`} width="400"/>
                </div>

                <div>
                    <h2 className='text-2xl'>Stats</h2>
                    
                    {Object.keys(teamData[0]).map(e => {
                        if (
                            e !== 'teamNumber' &&
                            e !== 'scouterName' &&
                            e !== 'climb'
                        ) {
                            return (
                                <p key={e}>
                                    {camelToSpaced(e)}:{' '}
                                    {teamData
                                        .map(e2 => Number(e2[e]))
                                        .reduce((a, b) => a + b)}
                                </p>
                            );
                        }
                    })}
                </div>
            </div>
        );
    };
}

export default TeamSummary;
