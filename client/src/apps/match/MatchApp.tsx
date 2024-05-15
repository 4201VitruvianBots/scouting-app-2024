import EndgameButton from './components/EndGameButton';
import FieldButton from './components/FieldButton';
import LinkButton from '../../components/LinkButton';
import {
    ClimbPosition,
    MatchData,
    MatchSchedule,
    RobotPosition,
    ScouterPosition,
} from 'requests';
import { SetStateAction, useEffect, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import SignIn from '../../components/SignIn';
import Dialog from '../../components/Dialog';
import NumberInput from '../../components/NumberInput';
import { useStatus } from '../../lib/useStatus';
import TeamDropdown from '../../components/TeamDropdown';
import { useQueue } from '../../lib/useQueue';
import scheduleFile from '../../assets/matchSchedule.json';
import { usePreventUnload } from '../../lib/usePreventUnload';

const schedule = scheduleFile as MatchSchedule;

interface MatchScores {
    autoShootNear: number;
    autoShootMid: number;
    autoShootFar: number;
    autoAmp: number;
    autoMiss: number;
    teleShootNear: number;
    teleShootMid: number;
    teleShootFar: number;
    hold: number; // Did the robot hold a note between auto and teleop? 0=no, 1=yes
    teleAmp: number;
    teleMiss: number;
    trap: number;
}
const defualtScores: MatchScores = {
    autoShootNear: 0,
    autoShootMid: 0,
    autoShootFar: 0,
    autoAmp: 0,
    autoMiss: 0,
    teleShootNear: 0,
    teleShootMid: 0,
    teleShootFar: 0,
    hold: 0,
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

    const handleAbsentRobot = async () => {
        if (robotPosition == undefined || matchNumber == undefined) {
            alert('Check if your signed in, and you have the match number');
            return;
        }

        const data: MatchData = {
            metadata: {
                scouterName,
                robotPosition,
                matchNumber,
                robotTeam: undefined,
            },
            leftStartingZone: leave,
            autoNotes: {
                near: count.autoShootNear,
                mid: count.autoShootMid,
                far: count.autoShootFar,
                amp: count.autoAmp,
                miss: count.autoMiss,
            },
            teleNotes: {
                near: count.teleShootNear,
                mid: count.teleShootMid,
                far: count.teleShootFar,
                amp: count.teleAmp,
                miss: count.teleMiss,
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

    const handleSubmit = async () => {
        if (
            robotPosition == undefined ||
            matchNumber == undefined ||
            teamNumber == undefined
        ) {
            alert('data is missing! :(');
            return;
        }

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
                miss: count.autoMiss,
            },
            teleNotes: {
                near: count.teleShootNear,
                mid: count.teleShootMid,
                far: count.teleShootFar,
                amp: count.teleAmp,
                miss: count.autoMiss,
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

    const showConfirmationDialog = () => {
        if (window.confirm('Are you sure you want to mark as absent?')) {
            // User confirmed, call the action
            handleAbsentRobot();
            // Optionally, you can also scroll to the top
            scrollTo(0, 0);
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

    useEffect(() => {
        setTeamNumber(
            schedule && robotPosition && matchNumber
                ? schedule[matchNumber]?.[robotPosition]
                : undefined
        );
    }, [matchNumber, robotPosition]);

    useStatus(robotPosition, matchNumber, scouterName);

    return (
        <main className='mx-auto flex w-min grid-flow-row flex-col content-center items-center justify-center '>
            {showCheck && (
                <MaterialSymbol
                    icon='check'
                    size={150}
                    fill
                    grade={200}
                    color='green'
                    className='absolute right-10 top-0 ml-10'
                />
            )}
            <h1 className='my-8 text-center text-3xl'>Match Scouting App</h1>

            <div className='fixed left-4 top-4 z-20 flex flex-row gap-3 rounded-md bg-slate-200 p-1'>
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
                    open
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
                            scouterPosition={scouterPosition}
                            onChangeScouterPosition={setScouterPosition}
                            onSubmit={close}
                        />
                    )}
                </Dialog>
                <button
                    onClick={undoCount}
                    className='z-10 aspect-square snap-none rounded bg-[#f07800]  font-bold text-black '>
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

            <p className='mb-2 mt-2 text-2xl'>Match Number</p>
            <NumberInput
                className='border border-black'
                onChange={setMatchNumber}
                value={matchNumber}
            />
            <p className='mb-2 mt-2 text-2xl'>Team Number</p>
            <TeamDropdown onChange={setTeamNumber} value={teamNumber} />

            <div>
                <button
                    onClick={showConfirmationDialog}
                    style={{ fontSize: '20px' }}
                    className='mb-2 mt-14 rounded-md bg-green-500 px-2 py-1 text-center'>
                    Robot Absent
                </button>
            </div>

            <div>
                <h2 className='mb-5 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Autonomous
                </h2>
                <FieldButton
                    setCount={handleSetCount}
                    setLeave={setLeave}
                    teleOp={false}
                    count={count}
                    leave={leave}
                    alliance={blueAlliance}
                    scouterPosition={scouterPosition}
                />
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Tele-Op
                </h2>
                <FieldButton
                    setCount={handleSetCount}
                    teleOp={true}
                    count={count}
                    alliance={blueAlliance}
                    scouterPosition={scouterPosition}
                />
                <h2 className='my-6 mt-12 text-center text-5xl font-semibold text-green-600'>
                    Endgame
                </h2>
                <EndgameButton
                    setCount={handleSetCount}
                    climbPosition={climbPosition}
                    setClimb={setClimbPosition}
                    alliance={blueAlliance}
                    scouterPosition={scouterPosition}
                    count={count}
                />
                <div className='mb-5 mt-20 flex flex-col justify-center'>
                    <button
                        onClick={() => {
                            handleSubmit();
                            scrollTo(0, 0);
                        }}
                        style={{ fontSize: '30px' }}
                        className='rounded-md bg-green-500 px-2 py-1 text-center'>
                        Submit
                    </button>
                </div>
            </div>

            <div>
                <div>Queue: {queue.length}</div>
                <button
                    onClick={sendAll}
                    className='rounded-md bg-amber-500 px-2 py-1 text-center'>
                    {sending ? 'Sending...' : 'Resend All'}
                </button>
            </div>
        </main>
    );
}

export type { MatchScores, ClimbPosition };

export default MatchApp;
