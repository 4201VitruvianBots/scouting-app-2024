import EndgameButton from '../../components/EndGameButton';
import FieldButton from '../../components/FieldButton';
import LinkButton from '../../components/LinkButton';
import { ClimbPosition, MatchData, RobotPosition } from 'requests';
import { SetStateAction, useState } from 'react';
import { postJson } from '../../lib/postJson';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';

type countKeys = keyof MatchScores;

interface MatchScores {
    autoShootNear: number;
    autoShootMid: number;
    autoShootFar: number;
    autoAmp: number;
    autoMiss: number;
    autoPreload: number;
    autoPickupFloor: number;
    hold: number; // Did the robot hold a note between auto and teleop? 0=no, 1=yes
    teleShootNear: number;
    teleShootMid: number;
    teleShootFar: number;
    teleAmp: number;
    teleMiss: number;
    telePickupSpeaker: number;
    telePickupMiddle: number;
    telePickupSource: number;
    trap: number;
};
const defualtScores: MatchScores = {
    autoShootNear: 0,
    autoShootMid: 0,
    autoShootFar: 0,
    autoAmp: 0,
    autoMiss: 0,
    autoPreload: 0,
    autoPickupFloor: 0,
    hold: 0,
    teleShootNear: 0,
    teleShootMid: 0,
    teleShootFar: 0,
    teleAmp: 0,
    teleMiss: 0,
    telePickupSpeaker: 0,
    telePickupMiddle: 0,
    telePickupSource: 0,
    trap: 0,
};

function MatchApp() {
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
    const [showCheck, setShowCheck] = useState(false);

    const [scouterName, setScouterName] = useState('');
    const [robotPosition, setRobotPosition] = useState<RobotPosition>();

    
    const handleSubmit = async () => {
        if (robotPosition === undefined) return;
        
        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber: 42,
                robotTeam: 48392,
                
            },
            leftStartingZone: leave,
            autoSpeakerNotes: {
                near: count.autoShootNear,
                mid: count.autoShootMid,
                far: count.autoShootFar,
                amp: count.autoAmp,
                miss: count.autoMiss
            },
            teleSpeakerNotes: {
                near: count.teleShootNear,
                mid: count.teleShootMid,
                far: count.teleShootFar,
                amp: count.teleAmp,
                miss: count.autoMiss
            },
            trapNotes: count.trap,
            climb: climbPosition,
        };

        try {
            const result = await postJson('/data/match', data);
            if (!result.ok) throw new Error('Request Did Not Succeed');
            setCount(defualtScores);
            setClimbPosition('none');
            setLeave(false);
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

    return(
        <main className='w-min mx-auto items-center justify-center grid-flow-row content-center  flex flex-col'>
            <h1 className='text-3xl text-center my-8'>Match Scouting App</h1>
            <div className='fixed left-4 top-4 z-20  p-2 rounded-md flex gap-2'>
                <LinkButton link='/' className='snap-none'><MaterialSymbol icon="home" size={80} fill grade={200} color='green' className='snap-none'/></LinkButton>
                <button onClick={undoCount} className='z-10 rounded bg-[#f07800] p-3 text-[100%] font-bold text-black snap-none'><MaterialSymbol icon="undo" size={80} fill grade={200} color='black' className='snap-none'/></button>
            </div>

            <SignIn scouterName={scouterName} onChangeScouterName={setScouterName} robotPosition={robotPosition} onChangeRobotPosition={setRobotPosition}/>
            
           

            <div>
                <h2 className='text-2xl text-center my-4'>Autonomous</h2>
                <FieldButton setCount={handleSetCount} setLeave={setLeave} teleOp={false}
                count={count} leave={leave}/>
                <h2 className='text-2xl text-center my-2 snap-start'>Tele-Op</h2>
                <FieldButton setCount={handleSetCount} teleOp={true} count={count}/>
                <h2 className='text-2xl text-center my-2 snap-start'>Endgame</h2>
                <EndgameButton climbPosition={climbPosition} setClimb={setClimbPosition}/>
                <button onClick={() => {if (count.trap < 3) handleCount('trap')}}>
                    Trap Note: {count.trap}
                </button>
            <button onClick={handleSubmit} className='px-2 py-1 bg-blue-500 rounded-md'>Submit</button>
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