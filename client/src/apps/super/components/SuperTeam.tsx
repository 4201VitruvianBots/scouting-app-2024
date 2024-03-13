import { Dispatch } from 'react';
import { Foul, Break, DefenseRank, CommentValues } from 'requests';
import ButtonDropdown from '../../../components/ButtonDropdown';
import MultiButton from '../../../components/MultiButton';
import Checkbox from '../../../components/Checkbox';
import TeamDropdown from '../../../components/TeamDropdown';
import CannedCommentBox from '../../../components/CannedComments';

export interface SuperTeamState {
    foulCounts: Record<Foul, number>;
    breakCount: Record<Break, number>;
    defenseRank: DefenseRank;
    wasDefended: boolean;
    teamNumber: number | undefined;
    cannedComments: CommentValues[];
}

function SuperTeam({
    teamState,
    setTeamState,

}: {
    teamState: SuperTeamState;
    setTeamState: Dispatch<SuperTeamState>;
}) {
    const handleFoul = (fouls: Record<Foul, number>) => {
        setTeamState({ ...teamState, foulCounts: fouls });
    };
    const handleBreak = (breaks: Record<Break, number>) => {
        setTeamState({ ...teamState, breakCount: breaks });
    };
    const handleDefense = (newDefense: DefenseRank) => {
        setTeamState({ ...teamState, defenseRank: newDefense });
    };
    const handleWasDefended = (newDefended: boolean) => {
        setTeamState({ ...teamState, wasDefended: newDefended });
    };

    const handleChangeTeam = (newChangeTeam: number ) => {
        setTeamState({ ...teamState, teamNumber: newChangeTeam});
    };
   
    const handleAddComment = (comments: CommentValues[] ) => {
        setTeamState({ ...teamState, cannedComments: comments });
    };


    // saves all the other inputs, ovverrides the one in setTeamState({... comments, X})
   
    return (
        <div className='grid justify-items-center'>
            <TeamDropdown value={teamState.teamNumber} onChange={handleChangeTeam} /> 

            <CannedCommentBox value={teamState.cannedComments} onChange={handleAddComment}/>
            {/* handleAddComment takes the argument of comments (just a name we assigned it) that's of type string[], which 
            checks out from what we told it onChange would give
            setTeam
             */}


            <ButtonDropdown value={teamState.foulCounts} setValue={handleFoul}>
                Add Foul
            </ButtonDropdown>
            
            <ButtonDropdown value={teamState.breakCount} setValue={handleBreak}>
                Add Break
            </ButtonDropdown>
            <MultiButton
                onChange={handleDefense}
                value={teamState.defenseRank}
                labels={['Full Defense', 'Some Defense', 'No Defense']}
                values={['fullDef', 'someDef', 'noDef']}
                className='text-black w-full my-2'
            />
            <div>
                <Checkbox
                    className='text-3xl text-white'
                    boxClassName='size-5'
                    checked={teamState.wasDefended}
                    onChange={handleWasDefended}>
                    {' '} Was Defended?
                </Checkbox>
            </div>
        </div>
    );
}

export default SuperTeam;
