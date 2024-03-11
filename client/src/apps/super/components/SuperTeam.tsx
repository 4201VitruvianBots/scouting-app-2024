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
    const handleIncreaseFoul = (foulType: keyof typeof teamState.foulCounts) => {
        const updatedFoulCounts = { ...teamState.foulCounts };
        updatedFoulCounts[foulType] = (updatedFoulCounts[foulType] || 0) + 1;
        setTeamState({ ...teamState, foulCounts: updatedFoulCounts });
    };
    const handleDecreaseFoul = (foulType: keyof typeof teamState.foulCounts) => {
        const updatedFoulCounts = { ...teamState.foulCounts };
        if (updatedFoulCounts[foulType] > 0) {
            updatedFoulCounts[foulType] -= 1;
        }
        setTeamState({ ...teamState, foulCounts: updatedFoulCounts });
    };
    const handleIncreaseBreak = (breakType: keyof typeof teamState.breakCount) => {
        const updatedBreakCounts = { ...teamState.breakCount };
        updatedBreakCounts[breakType] = (updatedBreakCounts[breakType] || 0) + 1;
        setTeamState({ ...teamState, breakCount: updatedBreakCounts });
    };
    const handleDecreaseBreak = (breakType: keyof typeof teamState.breakCount) => {
        const updatedBreakCounts = { ...teamState.breakCount };
        if (updatedBreakCounts[breakType] > 0) {
            updatedBreakCounts[breakType] -= 1;
        }
        setTeamState({ ...teamState, breakCount: updatedBreakCounts });
    };
    
    
    

    return (
        <div className='justify-items-center'>
            <TeamDropdown value={teamState.teamNumber} onChange={handleChangeTeam}/> 
        <p className='mt-5 text-4xl text-zinc-100 underline'>Fouls</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseFoul('insideRobot')}>+</button>
            <p className='text-xl text-zinc-100'>Inside Robot ({teamState.foulCounts.insideRobot || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseFoul('insideRobot')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseFoul('protectedZone')}>+</button>
            <p className='text-xl text-zinc-100'>Protected Zone ({teamState.foulCounts.protectedZone || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseFoul('protectedZone')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseFoul('pinning')}>+</button>
            <p className='text-xl text-zinc-100'>Pinning ({teamState.foulCounts.pinning || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseFoul('pinning')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseFoul('multiplePieces')}>+</button>
            <p className='text-xl text-zinc-100'>Multiple Pieces ({teamState.foulCounts.multiplePieces || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseFoul('multiplePieces')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseFoul('other')}>+</button>
            <p className='text-xl text-zinc-100'>Other ({teamState.foulCounts.other || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseFoul('other')}>-</button>
            
        <p className='mt-5 text-4xl text-zinc-100 underline'>Breaks</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseBreak('mechanismDmg')}>+</button>
            <p className='text-xl text-zinc-100'>Mechanism Dmg ({teamState.breakCount.mechanismDmg || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseBreak('mechanismDmg')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseBreak('batteryFall')}>+</button>
            <p className='text-xl text-zinc-100'>Battery Fall ({teamState.breakCount.batteryFall || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseBreak('batteryFall')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleIncreaseBreak('commsFail')}>+</button>
            <p className='text-xl text-zinc-100'>Comms Fail ({teamState.breakCount.commsFail || 0})</p>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md px-1' onClick={() => handleDecreaseBreak('commsFail')}>-</button>
            
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
