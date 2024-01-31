import FieldButton from '../../components/FieldButton';
import BackHome from '../../components/BackHome';
import HomeIcon from '@mui/icons-material/Home';
import EndgameButton from '../../components/EndGameButton';
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
    high: 0,
    aNear: 0,
    aMid: 0,
    aFar: 0,
};

function MatchApp() {
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=notleft, true=left

    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');
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
                scouterName: 'hjcd',
                robotTeam: 48392,
                robotPosition: 'blue_1',
            },
            leftStartingZone: leave,
            autoSpeakerNotes: {
                near: count.autoNear,
                mid: count.autoMid,
                far: count.autoFar,
            },
            autoAmpNotes: count.autoAmp,
            teleNonAmpedSpeakerNotes: {
                near: count.teleNear,
                mid: count.teleMid,
                far: count.teleFar,
            },
            teleAmpedSpeakerNotes: {
                near: count.aNear,
                mid: count.aMid,
                far: count.aFar,
            },
            teleAmpNotes: count.teleAmp,
            trapNotes: count.trap,
            highNotes: count.high,
            climb: climbPosition,
        };

        try {
            const result = await postJson('/data/match', data);
            if (!result.ok) throw new Error('request did not succeed');
            setCount(defualtScores);
            setClimbPosition('none');
            setLeave(false);
        } catch {
            alert('sending data failed');
        }
    };

    return (
        <main className='flex flex-col place-content-center items-center text-center'>
            <p className='p-7 text-3xl font-bold text-green-700 '>
                <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }></BackHome>{' '}
                Match Scouting App{' '}
            </p>

            <button
                onClick={undoCount}
                className='text-[100% m-5 mt-[-10px] h-[50px] w-[15%] items-center rounded bg-[#f07800] font-bold text-black'>
                Undo Count
            </button>


          

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


            <div className='flex flex-row gap-5'>
                <button
                    className='border-1 my-4 h-24 w-48 rounded-lg border border-gray-700  shadow-xl text-xl'
                    onClick={() => handleCount('high')}>
                    {' '}
                    High Note: {count.high}{' '}
                </button>
                <button
                    className='border-1 my-4 h-24 w-48 rounded-lg border border-gray-700 shadow-xl text-xl'
                    onClick={() => handleCount('trap')}>
                    {' '}
                    Trap Note: {count.trap}{' '}
                </button>
            </div>

            <button onClick={handleSubmit} className="text-[100% m-5 h-[50px] w-[35%] items-center my-5 rounded bg-blue-300 font-bold text-black">submit :3</button>
        </main>
    );
}

export default MatchApp;
export type { MatchScores, ClimbPosition };
