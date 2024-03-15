import Dialog from '../../../components/Dialog';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { AnalysisEntry, TeamSummaryData } from '../data';
import { PitResult, TeamData } from 'requests';
import RobotPhotoDialog from './RobotPhotoDialog';
import { snakeToSpaced } from '../../../lib/snakeCaseConvert';

function commentToColor(comment: string) {
        switch (comment) {
            case 'good_driving':
            case 'okay_defense':
                return 'text-[#50a1c7]';
            case 'clogging':
            case 'source_only':
            case 'avoids_under_stage':
                return 'text-[#c78450]';
            case 'weak_build':
            case 'ineffective_defense':
                return 'text-[#c75050]';
            case 'sturdy_build':
            case 'great_driving':
            case 'effective_defense':
                return 'text-[#5ac750]';
            default:
                    return 'gray-500';
    }
    }

function TeamSummary({
    table,
    data,
    teamInfoJson,
    pitData,
}: {
    table: TeamSummaryData;
    data: AnalysisEntry[];
    teamInfoJson: TeamData;
    pitData: PitResult;
}) {
    // Get the data for the team specified
    const teamData = data.find(e => e.teamNumber === table.teamNumber);
    
    const {info: teamInfo, avatar} = teamInfoJson[table.teamNumber] ?? {};
    const teamPitData = pitData[table.teamNumber];
    
    return (
        <div className='flex flex-row'>
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

            <div className='pl-5'>
                <h2 className='text-2xl pb-2'>Comments</h2>
                
                {teamData && teamData.Comments && Object.entries(teamData.Comments).sort(([_, a], [__, b]) => b - a).map(([comment, count]) => (
                    count > 0 && <p className={` ${commentToColor(comment)} `}>{snakeToSpaced(comment)}: {count}</p>
                ))}

                <h2 className='text-2xl pt-5 pb-2'>Stats</h2>
                
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
            <div>
                <h2 className='text-2xl pb-2'>Pit Scout Info</h2>
                
                <p className='indent-3'> Role: {teamPitData?.teamRole}</p>
                <p className='indent-3'> Batteries: {teamPitData?.pitBatteryCount}</p>
                <p className='indent-3'> Drivetrain: {teamPitData?.drivebase}</p>
                <p className='indent-3'> Notes: {teamPitData?.comments}</p>
                
                <p className='text-lg font-semibold text-green-800 pt-2'>Capabilities</p>
                <p className='indent-3'>Amp: {teamPitData?.capabilities.amp ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Speaker: {teamPitData?.capabilities.speaker ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Trap: {teamPitData?.capabilities.trap ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Climb: {teamPitData?.capabilities.climb ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Chain traversal: {teamPitData?.capabilities.chainTraversal ? 'Yes' : 'No'}</p>

                <p className='text-lg font-semibold text-green-800 pt-2'>Preferences</p>
                <p className='indent-3'>Amp: {teamPitData?.preference.ampPrefer ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Speaker: {teamPitData?.preference.speakerPerfer ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Trap: {teamPitData?.preference.trapPrefer ? 'Yes' : 'No'}</p>
                <p className='indent-3'>Climb: {teamPitData?.preference.climbPrefer ? 'Yes' : 'No'}</p>
                
               
                {/* <p className='text-lg font-semibold text-green-800 pt-2'>More Info</p> */}

               
                
                
            </div>
        </div>
    );
}

export default TeamSummary;
