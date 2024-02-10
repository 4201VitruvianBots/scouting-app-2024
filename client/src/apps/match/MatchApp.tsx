import EndgameButton from '../../components/EndGameButton';
import FieldButton from '../../components/FieldButton';
import LinkButton from '../../components/LinkButton';
import { ClimbPosition, MatchData, MatchSchedule, RobotPosition } from 'requests';
import { SetStateAction, useEffect, useState } from 'react';
import { postJson } from '../../lib/postJson';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';
import Dialog from '../../components/Dialog';
import { useFetchJson } from '../../lib/useFetchJson';
import NumberInput from '../../components/NumberInput';



type countKeys = keyof MatchScores;

interface MatchScores {
    autoNear: number;
    autoMid: number;
    autoFar: number;
    autoAmp: number;
    teleNear: number;
    teleMid: number;
    teleFar: number;
    teleAmp: number;
    trap: number;
};
const defualtScores: MatchScores = {
    autoNear: 0,
    autoMid: 0,
    autoFar: 0,
    autoAmp: 0,
    teleNear: 0,
    teleMid: 0,
    teleFar: 0,
    teleAmp: 0,
    trap: 0,
};

function MatchApp() {

    const schedule = useFetchJson<MatchSchedule>('/matchSchedule.json');
    const [teamNumber, setTeamNumber] = useState<number>();
    const [matchNumber, setMatchNumber] = useState<number>();
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
    const [showCheck, setShowCheck] = useState(false);

    const [scouterName, setScouterName] = useState('');
    const [robotPosition, setRobotPosition] = useState<RobotPosition>();

    const redAlliance = (
        ['red_1', 'red_2', 'red_3'] as (string | undefined)[]
    ).includes(robotPosition);
    
    const handleSubmit = async () => {
        if (robotPosition === undefined || matchNumber === undefined || teamNumber === undefined) return;

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: teamNumber,
                
            },
            leftStartingZone: leave,
            autoSpeakerNotes: {
                near: count.autoNear,
                mid: count.autoMid,
                far: count.autoFar,
            },
            autoAmpNotes: count.autoAmp,
            teleSpeakerNotes: {
                near: count.teleNear,
                mid: count.teleMid,
                far: count.teleFar,
            },
            teleAmpNotes: count.teleAmp,
            trapNotes: count.trap,
            climb: climbPosition,
        };

        try {
            const result = await postJson('/data/match', data);
            if (!result.ok) throw new Error('Request Did Not Succeed');
            setCount(defualtScores);
            setClimbPosition('none');
            setLeave(false);
            setMatchNumber(matchNumber +1);
        } catch {
            alert('Sending Data Failed');
        }

        setShowCheck(true);

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

    useEffect( () => {
        setTeamNumber(schedule && robotPosition && matchNumber?schedule[matchNumber]?.[robotPosition]: undefined)
    },[matchNumber, robotPosition, schedule])

    return (
        <main className='mx-auto flex w-min grid-flow-row flex-col content-center  items-center justify-center'>
            <h1 className='my-8 text-center text-3xl'>Match Scouting App</h1>
            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={60}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>

                <Dialog
                    trigger={open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${scouterName && robotPosition ? 'text-green-400' : 'text-gray-400'} snap-none`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            robotPosition={robotPosition}
                            onChangeRobotPosition={setRobotPosition}
                            onSubmit={close}
                        />
                    )}
                </Dialog>
                <button
                    onClick={undoCount}
                    className='z-10 aspect-square snap-none rounded bg-[#f07800] p-1 font-bold text-black '>
                    <MaterialSymbol
                        icon='undo'
                        size={60}
                        fill
                        grade={200}
                        color='black'
                        className='snap-none'
                    />
                </button>
               
            </div>
            <p>Team Number</p>
            <NumberInput onChange={setTeamNumber} value={teamNumber}/> 
            <p>Match Number</p>
            <NumberInput onChange={setMatchNumber} value={matchNumber}/>

           

            <div>
                <h2 className='text-2xl text-center my-4'>Autonomous</h2>
                <FieldButton
                    setCount={handleSetCount}
                    setLeave={setLeave}
                    teleOp={false}
                    count={count}
                    leave={leave}
                    alliance={redAlliance}
                />
                <h2 className='text-2xl text-center my-2'>Tele-Op</h2>
                <FieldButton
                    setCount={handleSetCount}
                    teleOp={true}
                    count={count}
                    alliance={redAlliance}
                />
                <h2 className='text-2xl text-center my-2'>Endgame</h2>
                <EndgameButton
                    climbPosition={climbPosition}
                    setClimb={setClimbPosition}
                    alliance={redAlliance}
                />
                <button onClick={() => {if (count.trap < 3) handleCount('trap')}}>
                    Trap Note: {count.trap}
                </button>
            <button onClick={handleSubmit} 
                className='px-2 py-1 bg-blue-500 rounded-md'>
                Submit
            </button>
            <div>
                {showCheck && (   
                    <MaterialSymbol icon="check" size={100} fill grade={200} color='green' />               
                )}
            </div>
            </div>
        </main>
    );
}

export type { MatchScores, ClimbPosition };
export default MatchApp