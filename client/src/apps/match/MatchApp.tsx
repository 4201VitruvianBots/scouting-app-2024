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