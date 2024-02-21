import { Dispatch } from 'react';
import { Foul, Break, DefenseRank } from 'requests';
import ButtonDropdown from '../../../components/ButtonDropdown';
import MultiButton from '../../../components/MultiButton';
import Checkbox from '../../../components/Checkbox';
import TeamDropdown from '../../../components/TeamDropdown';

export interface SuperTeamState {
    foulCounts: Record<Foul, number>;
    breakCount: Record<Break, number>;
    defenseRank: DefenseRank;
    wasDefended: boolean;
    teamNumber: number | undefined;
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
    const handleChangeTeam = (newChangeTeam: number) => {
        setTeamState({ ...teamState, teamNumber: newChangeTeam });
    };

    return (
        <div>
            <TeamDropdown value={teamState.teamNumber} onChange={handleChangeTeam}/> 
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
            />
            <div>
                <Checkbox
                    checked={teamState.wasDefended}
                    onChange={handleWasDefended}>
                    Was Defended?
                </Checkbox>
            </div>
        </div>
    );
}

export default SuperTeam;