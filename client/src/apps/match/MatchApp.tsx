import EndgameButton from '../../components/EndGameButton';
import FieldButton from '../../components/FieldButton';
import LinkButton from '../../components/LinkButton';
import { ClimbPosition, MatchData } from 'requests';
import { SetStateAction, useState } from 'react';
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
    high: 0,
    aNear: 0,
    aMid: 0,
    aFar: 0,
};

function MatchApp() {
    const [count, setCount] = useState<MatchScores>(defualtScores);
    const [leave, setLeave] = useState(false); //false=Not Left, true=Left
    const [countHistory, setCountHistory] = useState<MatchScores[]>([]);
    const [climbPosition, setClimbPosition] = useState<ClimbPosition>('none');

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
            if (!result.ok) throw new Error('Request Did Not Succeed');
            setCount(defualtScores);
            setClimbPosition('none');
            setLeave(false);
        } catch {
            alert('Sending Data Failed');
        }
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
        <main>
            <p>Match Scouting App</p>
            <div>
                <LinkButton link='/'>Home</LinkButton>
                <button onClick={undoCount}>Undo Count</button>
            </div>
            <div>
                <p>Autonomous</p>
                <FieldButton setCount={handleSetCount} setLeave={setLeave} teleOp={false}
                count={count} leave={leave}/>
            </div>
            <div>
                <p>Tele-Op</p>
                <FieldButton setCount={handleSetCount} teleOp={true} count={count}/>
            </div>
            <div>
                <p>Endgame</p>
                <EndgameButton climbPosition={climbPosition} setClimb={setClimbPosition}/>
                <button onClick={() => handleCount('high')}>
                    High Note: {count.high}
                </button>
                <button onClick={() => handleCount('trap')}>
                    Trap NoteL {count.trap}
                </button>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
}

export type { MatchScores, ClimbPosition };
export default MatchApp