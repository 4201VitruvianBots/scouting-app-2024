import Dialog from '../../../components/Dialog';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { AnalysisEntry, TeamSummaryData } from '../data';
import { TeamData } from 'requests';
import RobotPhotoDialog from './RobotPhotoDialog';

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
    const teamData = data.find(e => e.teamNumber === table.teamNumber);
    
    const {info: teamInfo, avatar} = teamInfoJson[table.teamNumber] ?? {};
    
    return (
        <div className='flex space-x-10'>
            <div>
                <div className='flex space-x-4'>
                    {avatar && <img src={`data:image/png;base64,${avatar}`} />}
                    <h1 className='text-3xl'>
                        Team {teamInfo ? `${teamInfo.team_number} - ${teamInfo.nickname}` : table.teamNumber}
                    </h1>
                </div>

                {teamInfo && <>
                    <p className='max-w-md text-gray-500'>{teamInfo.name}</p>
                    <br />

                    <div className='flex space-x-4'>
                        <p>
                            From {teamInfo.city}, {teamInfo.state_prov},{' '}
                            {teamInfo.country}
                        </p>
                        <p>Rookie Year: {teamInfo.rookie_year}</p>
                    </div>
                </>}

                <br />
                
                <Dialog
                    trigger={open => (
                        <button onClick={open}>
                            <img src={`/image/${table.teamNumber}.jpeg`} width="400" alt="" />
                        </button>
                    )}
                    >
                    {close => (
                        <RobotPhotoDialog teamNumber={table.teamNumber} onClose={close} />
                    )}
                </Dialog>
            </div>

            <div>
                <h2 className='text-2xl'>Comments</h2>
                
                {teamData && Object.entries(teamData.Comments).map(([comment, count]) => (
                    <p>{comment}: {count}</p>
                ))}

                <h2 className='text-2xl'>Stats</h2>
                
                {teamData && Object.keys(teamData).map(e => {
                    if (
                        e !== 'teamNumber' &&
                        e !== 'scouterName' &&
                        e !== 'climb' &&
                        e !== 'Comments'
                    ) {
                        return (
                            <p key={e}>
                                {camelToSpaced(e)}:{' '}
                                {teamData[e]}
                            </p>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default TeamSummary;
