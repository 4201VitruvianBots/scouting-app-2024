//import ToggleButton from '../../components/ToggleButton'
import React, { Dispatch, SetStateAction, useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';

function Counter({
    value,
    onChange,
    children,
}: {
    value: number;
    onChange: Dispatch<SetStateAction<number>>;
    children: string;
}) {
    return (
        <>
            <button
                className='text-md my-2 rounded-l-lg border bg-red-400 px-4 py-2 text-zinc-100'
                onClick={() => onChange(value > 0 ? value - 1 : value)}>
                -
            </button>
            <button
                className='text-md min-w-55 my-2 rounded-r-lg border bg-slate-600 px-3  py-2 text-zinc-100'
                onClick={() => onChange(value + 1)}>
                + {children} ({value})
            </button>
        </>
    );
}

function ScoreCalculator() {
    const [autoLeave, setAutoLeave] = useState(0);
    const [autoSpeaker, setAutoSpeaker] = useState(0);
    const [autoAmp, setAutoAmp] = useState(0);
    const [teleSpeaker, setTeleSpeaker] = useState(0);
    const [ampedTeleSpeaker, setAmpedTeleSpeaker] = useState(0);
    const [teleAmp, setTeleAmp] = useState(0);
    const [park, setPark] = useState(0);
    const [climb, setClimb] = useState(0);
    const [climbSpot, setClimbSpot] = useState(0);
    const [trap, setTrap] = useState(0);
    const [harmony, setHarmony] = useState(0);

    const handleReset = () => {
        setAutoLeave(0);
        setAutoSpeaker(0);
        setAutoAmp(0);
        setTeleSpeaker(0);
        setAmpedTeleSpeaker(0);
        setTeleAmp(0);
        setPark(0);
        setClimb(0);
        setClimbSpot(0);
        setTrap(0);
        setHarmony(0);
    };

    return (
        <div className='flex h-dvh flex-col'>
            <div className='mb-2 border border-neutral-900 bg-gray-800'>
                <br />
                <h1 className='mb-4 text-center text-3xl  font-bold text-[#48c55c]'>
                    Score Calculator
                </h1>
            </div>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-1'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={50}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>

            <div className='flex flex-grow flex-col'>
                <button
                    onClick={handleReset}
                    className='text-md col-span-2 mx-2 rounded-md border bg-blue-400/70 px-3 py-2 text-black'>
                    Reset All
                </button>
                <div className='flex flex-grow snap-x snap-mandatory flex-row overflow-x-auto *:flex-shrink-0'>
                    <div className='grid w-23/24 snap-center snap-always grid-cols-[auto_1fr] p-2  grid-rows-[auto] auto-rows-fr'>
                        <h2 className='col-span-2 text-xl text-green-600 text-center'>Auto</h2>
                        <Counter value={autoLeave} onChange={setAutoLeave}>
                            Auto Leave
                        </Counter>
                        <Counter value={autoSpeaker} onChange={setAutoSpeaker}>
                            Auto Speaker
                        </Counter>
                        <Counter value={autoAmp} onChange={setAutoAmp}>
                            Auto Amp
                        </Counter>
                    </div>
                    <div className='grid w-11/12 snap-center snap-always grid-cols-[auto_1fr] p-2 grid-rows-[auto] auto-rows-fr'>
                        <h2 className='col-span-2 text-xl text-green-600 text-center'>Teleop</h2>
                        <Counter value={teleSpeaker} onChange={setTeleSpeaker}>
                            Tele Speaker
                        </Counter>
                        <Counter
                            value={ampedTeleSpeaker}
                            onChange={setAmpedTeleSpeaker}>
                            Amped Tele Speaker
                        </Counter>

                        <Counter value={teleAmp} onChange={setTeleAmp}>
                            Tele Amp
                        </Counter>
                    </div>

                    <div className='grid w-23/24 snap-center snap-always grid-cols-[auto_1fr] p-2  grid-rows-[auto] auto-rows-fr'>
                        <h2 className='col-span-2 text-xl text-green-600 text-center'>Endgame</h2>
                        <Counter value={park} onChange={setPark}>
                            Park
                        </Counter>
                        <Counter value={climb} onChange={setClimb}>
                            Climb
                        </Counter>
                        <Counter value={climbSpot} onChange={setClimbSpot}>
                            Spotlit Climb
                        </Counter>
                        <Counter value={trap} onChange={setTrap}>
                            Trap
                        </Counter>
                        <Counter value={harmony} onChange={setHarmony}>
                            Harmonies
                        </Counter>
                    </div>
                </div>

                <div className='col-span-2 grid grid-cols-2 justify-center gap-2 bg-slate-200 p-3'>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Leave:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoLeave * 2}
                        </span>
                    </p>

                    <p
                        className={` text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center`}>
                        Speaker:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoSpeaker * 5 +
                                teleSpeaker * 2 +
                                ampedTeleSpeaker * 5}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Amp:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoAmp * 2 + teleAmp * 1}
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Stage:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {park * 1 +
                                climb * 3 +
                                climbSpot * 4 +
                                trap * 5 +
                                harmony * 2}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreCalculator;
