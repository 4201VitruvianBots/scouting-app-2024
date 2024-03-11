import EndgameButton from '../../components/EndGameButton';
import FieldButton from '../../components/FieldButton';
import LinkButton from '../../components/LinkButton';
import { ClimbPosition, MatchData, MatchSchedule, RobotPosition, ScouterPosition } from 'requests';
import { SetStateAction, useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';
import ConeStacker from '../../components/ConeStacker';
import Dialog from '../../components/Dialog';
import NumberInput from '../../components/NumberInput';
import { useStatus } from '../../lib/useStatus';
import TeamDropdown from '../../components/TeamDropdown';
import { useQueue } from '../../lib/useQueue';
import scheduleFile from '../../assets/matchSchedule.json';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ScoreMap from '../../components/ScoreMap';

const schedule = scheduleFile as MatchSchedule

type countKeys = keyof MatchScores;

interface MatchScores {
    autoSpeaker: number;
    autoAmp: number;
    autoMiss: number;
    hold: number; // Did the robot hold a note between auto and teleop? 0=no, 1=yes
    teleSpeaker: number;
    teleAmp: number;
    teleMiss: number;
    trap: number;
}
const defualtScores: MatchScores = {
    autoSpeaker: 0,
    autoAmp: 0,
    autoMiss: 0,
    hold: 0,
    teleSpeaker: 0,
    teleAmp: 0,
    teleMiss: 0,
    trap: 0,
};

function MatchApp() {
    usePreventUnload();
    const [sendQueue, sendAll, queue, sending] = useQueue();
    const [teamNumber, setTeamNumber] = useState<number>();
    const [matchNumber, setMatchNumber] = useState<number>();
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
    const [showCheck, setShowCheck] = useState(false);
    const [scouterName, setScouterName] = useState('');

    const [robotPosition, setRobotPosition] = useState<RobotPosition>();

    const [scouterPosition, setScouterPosition] = useState<ScouterPosition>();

    const blueAlliance = (
        ['blue_1', 'blue_2', 'blue_3'] as (string | undefined)[]
    ).includes(robotPosition);

    const handleSubmit = async () => {
        if (
            robotPosition == undefined ||
            matchNumber == undefined ||
            teamNumber == undefined
        ) {
            alert('data is missing! :(')
            return; }

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: teamNumber,
            },
            leftStartingZone: leave,
            autoNotes: {
                near: count.autoShootNear,
                mid: count.autoShootMid,
                far: count.autoShootFar,
                amp: count.autoAmp,
                miss: count.autoMiss
            },
            teleNotes: {
                near: count.teleShootNear,
                mid: count.teleShootMid,
                far: count.teleShootFar,
                amp: count.teleAmp,
                miss: count.autoMiss
            },
            trapNotes: count.trap,
            climb: climbPosition,
        };

        sendQueue('/data/match', data);
        setCount(defualtScores);
        setClimbPosition('none');
        setLeave(false);
        setMatchNumber(matchNumber + 1);
        setCountHistory([]);

        setShowCheck(true);

        setTimeout(() => {
            setShowCheck(false);
          }, 3000);

        
    };

    const undoCount = () => {
        if (countHistory.length > 0) {
            setCountHistory(prevHistory => prevHistory.slice(0, -1));
            setCount(countHistory.at(-1)!);
        }
    };
    const handleSetCount = (newCount: SetStateAction<MatchScores>) => {
        setCountHistory([...countHistory, count]);
        setCount(newCount);
    };
    const handleCount = (key: countKeys) => {
        handleSetCount({ ...count, [key]: count[key] + 1 });
    };

    useEffect(() => {
        setTeamNumber(
            schedule && robotPosition && matchNumber
                ? schedule[matchNumber]?.[robotPosition]
                : undefined
        );
    }, [matchNumber, robotPosition]);

    useStatus(robotPosition, matchNumber, scouterName);

    return (
        // <main className='mx-auto flex w-min grid-flow-row flex-col content-center items-center justify-center '>
        //         {showCheck && (
        //             <MaterialSymbol icon="check" size={150} fill grade={200} color='green' className='ml-10 absolute top-0 right-10'/>
        //         )}
        //     <h1 className='my-8 text-center text-3xl'>Match Scouting App</h1>
        //     <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
        //         <LinkButton link='/' className='snap-none'>
        //             <MaterialSymbol
        //                 icon='home'
        //                 size={60}
        //                 fill
        //                 grade={200}
        //                 color='green'
        //                 className='snap-none'
        //             />
        //         </LinkButton>
                
        //         <Dialog
        //             open
        //             trigger={open => (
        //                 <button onClick={open}>
        //                     <MaterialSymbol
        //                         icon='account_circle'
        //                         size={60}
        //                         fill
        //                         grade={200}
        //                         className={` ${scouterName && robotPosition ? 'text-green-400' : 'text-gray-400'} snap-none`}
        //                     />
        //                 </button>
        //             )}>
                        
        //             {close => (
        //                 <SignIn
        //                     scouterName={scouterName}
        //                     onChangeScouterName={setScouterName}
        //                     robotPosition={robotPosition}
        //                     onChangeRobotPosition={setRobotPosition}
        //                     scouterPosition={scouterPosition}
        //                     onChangeScouterPosition={setScouterPosition}
        //                     onSubmit={close}
        //                 />
        //             )}
        //         </Dialog>
        //         <button
        //             onClick={undoCount}
        //             className='z-10 aspect-square snap-none rounded bg-[#f07800] p-1 font-bold text-black '>
        //             <MaterialSymbol
        //                 icon='undo'
        //                 size={60}
        //                 fill
        //                 grade={200}
        //                 color='black'
        //                 className='snap-none'
        //             />
        //         </button>
        //         <ConeStacker />
        //     </div>
           
        //     <p className='text-2xl mt-2 mb-2'>Match Number</p>
        //     <NumberInput onChange={setMatchNumber} value={matchNumber} />
        //     <p className='text-2xl mt-2 mb-2'>Team Number</p>
        //     <TeamDropdown onChange={setTeamNumber} value={teamNumber}  />

        //     <div>
        //         <h2 className='mt-12 mb-5 text-center text-5xl text-green-600 font-semibold'>Autonomous</h2>
        //         <FieldButton
        //             setCount={handleSetCount}
        //             setLeave={setLeave}
        //             teleOp={false}
        //             count={count}
        //             leave={leave}
        //             alliance={blueAlliance}
        //             scouterPosition={scouterPosition}
        //         />
        //         <h2 className='my-6 mt-12 text-center text-5xl text-green-600 font-semibold'>Tele-Op</h2>
        //         <FieldButton
        //             setCount={handleSetCount}
        //             teleOp={true}
        //             count={count}
        //             alliance={blueAlliance}
        //             scouterPosition={scouterPosition}
        //         />
        //         <h2 className='my-6 mt-12 text-center text-5xl text-green-600 font-semibold'>Endgame</h2>
        //         <EndgameButton
        //             climbPosition={climbPosition}
        //             setClimb={setClimbPosition}
        //             alliance={blueAlliance}
        //             scouterPosition={scouterPosition}
        //         />
        //         <div className='flex justify-center mt-20 mb-5'>
        //             <button onClick={() => { if (count.trap < 3) handleCount('trap') }} style={{ fontSize: '30px'}}
        //                 className='px-2 py-1 text-center bg-blue-300 rounded-md mr-2 block absolute left-24'>
        //                 Trap Note: {count.trap}
        //             </button>
        //             <button onClick={() => {handleSubmit(); scrollTo(0, 0);}} style={{ fontSize: '30px' }}
        //                 className='px-2 py-1 text-center bg-green-500 rounded-md'>
        //                         Submit
        //             </button>

        //         </div>
        //     </div>

        //     <div>
        //         <div>Queue: {queue.length}</div>
        //         <button onClick={sendAll}
        //                 className='px-2 py-1 text-center bg-amber-500 rounded-md'
        //         >{sending ? 'Sending...': 'Resend All'}</button>
        //     </div>
        // </main >
        <main className='bg-[#171c26] h-full w-full snap-y'>
            <div className='flex flex-col absolute right-4 top-4 z-20 gap-3 
            rounded-md bg-[#2f3646] p-2 pb-0'>
                <Dialog
                open
                trigger={
                    open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={
                                    `${scouterName && robotPosition ? 'text-[#48c55c]' : 
                                    'text-[#dee4f5]'}`
                                }
                            />
                        </button>
                    )}>   
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            robotPosition={robotPosition}
                            onChangeRobotPosition={setRobotPosition}
                            scouterPosition={scouterPosition}
                            onChangeScouterPosition={setScouterPosition}
                            onSubmit={close}
                        />
                    )}
                </Dialog>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={60}
                        fill
                        grade={200}
                        color='#dee4f5'
                        className='snap-none'
                    />
                </LinkButton>
            </div>
            <button
                onClick={undoCount}
                className='fixed left-4 top-4 z-20 aspect-square rounded 
                bg-[#dee4f5] p-1 font-bold text-black '>
                <MaterialSymbol
                    icon='undo'
                    size={60}
                    fill
                    grade={200}
                    color='black'
                    className='snap-none'
                />
            </button>
            <div className='grid columns-1 text-center justify-center 
            border-b-2 border-[#2f3646] pb-8'>
                <p className='py-8 text-center text-3xl 
                font-bold text-[#48c55c] snap-center'>
                    Match Scouting App
                </p>
                <NumberInput onChange={setMatchNumber} value={matchNumber} 
                className='bg-[#2f3646] text-2xl pl-[18px] pt-2 pb-2 text-[#dee4f5]
                outline-none rounded' placeholder='Match Number'/>
                <TeamDropdown onChange={setTeamNumber} value={teamNumber}/>
            </div>
            <div className='grid grid-cols-2 gap-10 px-10'>
                        <div className='col-span-2 text-center'>
                            <p className='py-5 text-3xl font-bold text-[#48c55c] snap-start'>
                                Autonomous:
                            </p>
                        </div>
                        <div>
                            <ScoreMap alliance={blueAlliance} 
                            scouterPosition={scouterPosition} 
                            handleCount={handleCount} count={count}/>
                        </div>
                        <div className='text-white'>
                            test
                        </div>
                        <div className='col-span-2 text-center'>
                            <p className='py-5 text-3xl font-bold text-[#48c55c] snap-start'>
                                Tele-Op:
                            </p>
                        </div>
                        <div>
                            <ScoreMap alliance={blueAlliance} 
                            scouterPosition={scouterPosition} 
                            handleCount={handleCount} count={count} 
                            setClimb={setClimbPosition} climbPosition={climbPosition} teleop/>
                        </div>
                        <div className='text-white'>
                            test
                        </div>
            </div>
        </main>
    );
} 


export type { MatchScores, ClimbPosition };

export default MatchApp
