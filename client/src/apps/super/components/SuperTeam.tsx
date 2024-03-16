import { Dispatch } from 'react';
import { Foul, Break, DefenseRank, CommentValues } from 'requests';
import MultiButton from '../../../components/MultiButton';
import Checkbox from '../../../components/Checkbox';
import TeamDropdown from '../../../components/TeamDropdown';
import CannedCommentBox, { SelectOption } from '../../../components/CannedComments';

export interface SuperTeamState {
    foulCounts: Record<Foul, number>;
    breakCount: Record<Break, number>;
    defenseRank: DefenseRank;
    wasDefended: boolean;
    teamNumber: number | undefined;
    cannedComments: SelectOption<CommentValues>[];
}

function SuperTeam({
    teamState,
    setTeamState,

}: {
    teamState: SuperTeamState;
    setTeamState: Dispatch<SuperTeamState>;
}) {
    const handleDefense = (newDefense: DefenseRank) => {
        setTeamState({ ...teamState, defenseRank: newDefense });
    };
    const handleWasDefended = (newDefended: boolean) => {
        setTeamState({ ...teamState, wasDefended: newDefended });
    };

    const handleChangeTeam = (newChangeTeam: number ) => {
        setTeamState({ ...teamState, teamNumber: newChangeTeam});
    };
   
    const handleAddComment = (comments: SelectOption<CommentValues>[] ) => {
        setTeamState({ ...teamState, cannedComments: comments });
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
    
    
    
//many divs, kinda ugly

    // saves all the other inputs, ovverrides the one in setTeamState({... comments, X})
   
    return (
        <div>
            
            <div className='mx-auto flex  flex-col content-center items-center justify-center '>

            <p className='text-zinc-100 underline text-lg pt-3'>Team Number</p>
            <TeamDropdown value={teamState.teamNumber} onChange={handleChangeTeam} allowAbsent/> 
            

           
            <p className='text-zinc-100 underline text-lg pt-3'>Notes</p>
            <CannedCommentBox value={teamState.cannedComments} onChange={handleAddComment}/>
            
            </div>
            
        <p className='mt-5 text-4xl text-zinc-100 underline'>Fouls</p>
       
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseFoul('insideRobot')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseFoul('insideRobot')}>+Inside Robot: {teamState.foulCounts.insideRobot || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseFoul('protectedZone')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseFoul('protectedZone')}>+Protected Zone: {teamState.foulCounts.protectedZone || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseFoul('pinning')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseFoul('pinning')}>+Pinning: {teamState.foulCounts.pinning || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseFoul('multiplePieces')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseFoul('multiplePieces')}>+Multiple Pieces: {teamState.foulCounts.multiplePieces || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseFoul('other')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseFoul('other')}>+Other: {teamState.foulCounts.other || 0}</button>
        </div>
        
        <p className='mt-7 text-4xl text-zinc-100 underline'>Breaks</p>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseBreak('mechanismDmg')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseBreak('mechanismDmg')}>+Mechanism Dmg: {teamState.breakCount.mechanismDmg || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseBreak('batteryFall')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseBreak('batteryFall')}>+Battery Fall: {teamState.breakCount.batteryFall || 0}</button>
        </div>
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => handleDecreaseBreak('commsFail')}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 w-44' onClick={() => handleIncreaseBreak('commsFail')}>+Comms Fail: {teamState.breakCount.commsFail || 0}</button>
        </div>
       
            <MultiButton
                onChange={handleDefense}
                value={teamState.defenseRank}
                labels={['Full Defense', 'Some Defense', 'No Defense']}
                values={['fullDef', 'someDef', 'noDef']}
                className='text-black w-full my-2 h-80% min-h-60%'
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
