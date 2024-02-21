import { Dispatch } from 'react';
import { DefenseRank, Foul } from 'requests';
import ButtonDropdown from '../../../components/ButtonDropdown';

export interface SuperTeamState {
    foulCounts: Record<Foul, number>;
    breakCount: number;
    defenseRank: DefenseRank;
    wasDefended: boolean;
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

    return (
        <div>
            <ButtonDropdown value={teamState.foulCounts} setValue={handleFoul}>
                Add Foul
            </ButtonDropdown>
        </div>
    );
}

export default SuperTeam;
