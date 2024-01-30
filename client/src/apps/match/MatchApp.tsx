import FieldButton from "../../components/FieldButton";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import EndgameButton from "../../components/EndGameButton";
import { SetStateAction, useState } from 'react';
import { Button } from '@mui/material';
import { ClimbPosition, MatchData } from 'requests';
import { postJson } from '../../lib/postJson';
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
    high: number;
    aNear: number;
    aMid: number;
    aFar: number;
}

const defualtScores:MatchScores = {
        autoNear: 0,
        autoMid: 0,
        autoFar: 0,
        autoAmp: 0,
        teleNear: 0,
        teleMid: 0,
        teleFar: 0,
        teleAmp: 0,
        trap: 0,
        high: 0,
        aNear: 0,
        aMid: 0,
        aFar: 0,
}

function MatchApp() {
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=notleft, true=left

    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
const [climbPosition, setClimbPosition] =useState<ClimbPosition>('none')
    const handleCount = (key: countKeys) => {
        handleSetCount({ ...count, [key]: count[key] + 1 });
    };

    const handleSetCount = (newCount: SetStateAction<MatchScores>) => {
        setCountHistory([...countHistory, count]);
        setCount(newCount);
    };

    const undoCount = () => {
        if (countHistory.length > 0) {
            setCountHistory(prevHistory => prevHistory.slice(0, -1));
            setCount(countHistory.at(-1)!);
        }


    };

    const handleSubmit = async () => {
        const data: MatchData = {
            metadata: {
                scouterName: "hjcd",
                robotTeam: 48392,
                robotPosition: 'blue_1',
            },
            leftStartingZone: leave,
            autoSpeakerNotes: {
                near: count.autoNear,
                mid: count.autoMid,
                far: count.autoFar
            },
            autoAmpNotes: count.autoAmp,
            teleNonAmpedSpeakerNotes: {
                near: count.teleNear,
                mid: count.teleMid,
                far: count.teleFar
            },
            teleAmpedSpeakerNotes: {
                near: count.aNear,
                mid: count.aMid,
                far: count.aFar
            },
            teleAmpNotes: count.teleAmp,
            trapNotes: count.trap,
            highNotes: count.high,
            climb: climbPosition
        };

    try{
        const result = await postJson('/data/match', data);
        if(!result.ok) throw new Error('request did not succeed')
        setCount(defualtScores);
        setClimbPosition("none");
        setLeave(false);
    } catch {
        alert('sending data failed') 
    }
       
    };

    return (
        <main className='grid place-content-center text-center'>
            <p>Match Scouting App</p>
            <BackHome
                link='/'
                icon={<HomeIcon style={{ fontSize: '30px' }} />}></BackHome>

            <Button onClick={undoCount}>Undo Count</Button>

            <p className="font-semibold text-[40px]">Auto</p>
            <FieldButton
                count={count}
                setCount={handleSetCount}
                teleop={false}
                leave={leave}
                setLeave={setLeave}
            />
             <p className="font-semibold text-[40px]">Teleop</p>
            <FieldButton
                count={count}
                setCount={handleSetCount}
                teleop={true}
            />
             <p className="font-semibold text-[40px]">Endgame</p>
            <EndgameButton climbPosition={climbPosition} setClimbPosition={setClimbPosition}></EndgameButton>

            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('high')}>
                {' '}
                High Note: {count.high}{' '}
            </button>
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('trap')}>
                {' '}
                Trap Note: {count.trap}{' '}
            </button>
            <Button onClick={handleSubmit}>submit :3</Button>
        </main>
    );
}


export default MatchApp;
export type { MatchScores , ClimbPosition}
