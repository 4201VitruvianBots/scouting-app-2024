import { Dispatch, SetStateAction } from 'react';
import { Foul, Break, DefenseRank } from 'requests';
import ButtonDropdown from '../../../components/ButtonDropdown';
import MultiButton from '../../../components/MultiButton';

export interface SuperTeamState {
    foulCounts: Record<Foul, number>;
    breakCount: Record<Break, number>;
}

function SuperTeam({
    teamState,
    setTeamState,
    setDefense,
    defenseRank
}: {
    teamState: SuperTeamState;
    setTeamState: Dispatch<SuperTeamState>;
    setDefense: Dispatch<SetStateAction<DefenseRank>>;
    defenseRank: DefenseRank
}) {
    const handleFoul = (fouls: Record<Foul, number>) => {
        setTeamState({ ...teamState, foulCounts: fouls });
    };
    const handleBreak = (breaks: Record<Break, number>) => {
        setTeamState({ ...teamState, breakCount: breaks });
    };
    const handleDefense = (newDefense: DefenseRank) => {
        setDefense(newDefense);
    }

    return (
        <div>
            <ButtonDropdown value={teamState.foulCounts} setValue={handleFoul}>
                Add Foul
            </ButtonDropdown>
            <ButtonDropdown value={teamState.breakCount} setValue={handleBreak}>
                Add Break
            </ButtonDropdown>
            <MultiButton onChange={handleDefense} value={defenseRank}
            labels={['Full Defense', 'Some Defense', 'No Defense']}
            values={['fullDef', 'someDef', 'noDef']}/>
        </div>
    );
}

export default SuperTeam;
