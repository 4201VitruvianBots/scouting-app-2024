import { Dispatch } from 'react';
import { Foul, Break, DefenseRank, CommentValues } from 'requests';
import MultiButton from '../../../components/MultiButton';
import Checkbox from '../../../components/Checkbox';
import TeamDropdown from '../../../components/TeamDropdown';
import CannedCommentBox, { SelectOption } from './CannedComments';

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

    const handleChangeTeam = (newChangeTeam: number) => {
        setTeamState({ ...teamState, teamNumber: newChangeTeam });
    };

    const handleAddComment = (comments: SelectOption<CommentValues>[]) => {
        setTeamState({ ...teamState, cannedComments: comments });
    };
    const handleIncreaseFoul = (
        foulType: keyof typeof teamState.foulCounts
    ) => {
        const updatedFoulCounts = { ...teamState.foulCounts };
        updatedFoulCounts[foulType] = (updatedFoulCounts[foulType] || 0) + 1;
        setTeamState({ ...teamState, foulCounts: updatedFoulCounts });
    };
    const handleDecreaseFoul = (
        foulType: keyof typeof teamState.foulCounts
    ) => {
        const updatedFoulCounts = { ...teamState.foulCounts };
        if (updatedFoulCounts[foulType] > 0) {
            updatedFoulCounts[foulType] -= 1;
        }
        setTeamState({ ...teamState, foulCounts: updatedFoulCounts });
    };
    const handleIncreaseBreak = (
        breakType: keyof typeof teamState.breakCount
    ) => {
        const updatedBreakCounts = { ...teamState.breakCount };
        updatedBreakCounts[breakType] =
            (updatedBreakCounts[breakType] || 0) + 1;
        setTeamState({ ...teamState, breakCount: updatedBreakCounts });
    };
    const handleDecreaseBreak = (
        breakType: keyof typeof teamState.breakCount
    ) => {
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
                <p className='pt-3 text-lg text-zinc-100 underline'>
                    Team Number
                </p>
                <TeamDropdown
                    value={teamState.teamNumber}
                    onChange={handleChangeTeam}
                    allowAbsent
                />

                <p className='pt-3 text-lg text-zinc-100 underline'>Notes</p>
                <CannedCommentBox
                    value={teamState.cannedComments}
                    onChange={handleAddComment}
                />
            </div>

            <p className='mt-5 text-4xl text-zinc-100 underline'>Fouls</p>

            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseFoul('insideRobot')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseFoul('insideRobot')}>
                    +Inside Robot: {teamState.foulCounts.insideRobot || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseFoul('protectedZone')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseFoul('protectedZone')}>
                    +Protected Zone: {teamState.foulCounts.protectedZone || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseFoul('pinning')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseFoul('pinning')}>
                    +Pinning: {teamState.foulCounts.pinning || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseFoul('multiplePieces')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseFoul('multiplePieces')}>
                    +Multiple Pieces: {teamState.foulCounts.multiplePieces || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseFoul('other')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseFoul('other')}>
                    +Other: {teamState.foulCounts.other || 0}
                </button>
            </div>

            <p className='mt-7 text-4xl text-zinc-100 underline'>Breaks</p>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseBreak('mechanismDmg')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseBreak('mechanismDmg')}>
                    +Mechanism Dmg: {teamState.breakCount.mechanismDmg || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseBreak('batteryFall')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseBreak('batteryFall')}>
                    +Battery Fall: {teamState.breakCount.batteryFall || 0}
                </button>
            </div>
            <div className='flex justify-center'>
                <button
                    className='mt-3 rounded-md border bg-red-400 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleDecreaseBreak('commsFail')}>
                    -
                </button>
                <button
                    className='mt-3 w-44 rounded-md border bg-slate-600 px-3 py-2 text-lg text-zinc-100'
                    onClick={() => handleIncreaseBreak('commsFail')}>
                    +Comms Fail: {teamState.breakCount.commsFail || 0}
                </button>
            </div>

            <MultiButton
                onChange={handleDefense}
                value={teamState.defenseRank}
                labels={['Full Defense', 'Some Defense', 'No Defense']}
                values={['fullDef', 'someDef', 'noDef']}
                className='h-80% min-h-60% my-2 w-full text-black'
            />
            <div>
                <Checkbox
                    className='text-3xl text-white'
                    boxClassName='size-5'
                    checked={teamState.wasDefended}
                    onChange={handleWasDefended}>
                    {' '}
                    Was Defended?
                </Checkbox>
            </div>
        </div>
    );
}

export default SuperTeam;
