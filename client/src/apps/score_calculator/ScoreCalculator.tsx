//import ToggleButton from '../../components/ToggleButton'
import React, { Dispatch, SetStateAction, useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';
import MultiButton from '../../components/MultiButton';

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
                className='text-md my-2 rounded-l-lg border bg-red-400 py-2 px-4 text-zinc-100'
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
    const [autoLeave, setAutoLeave] = useState(Number);
    const [autoSpeaker, setAutoSpeaker] = useState(Number);
    const [autoAmp, setAutoAmp] = useState(Number);
    const [teleSpeaker, setTeleSpeaker] = useState(Number);
    const [ampedTeleSpeaker, setAmpedTeleSpeaker] = useState(Number);
    const [teleAmp, setTeleAmp] = useState(Number);
    const [park, setPark] = useState(Number);
    const [climb, setClimb] = useState(Number);
    const [climbSpot, setClimbSpot] = useState(Number);
    const [trap, setTrap] = useState(Number);
    const [harmony, setHarmony] = useState(Number);
    const [speakerOnly, setSpeakerOnly] = useState(Boolean);

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
        <div
            className={`flex ${speakerOnly ? 'h-[70vh]' : 'h-screen'} flex-col`}>
            <div className='mb-7 border border-neutral-900 bg-gray-800'>
                <br />
                <h1 className='mb-4 text-center text-3xl  font-bold text-[#48c55c]'>
                    Score Calculator
                </h1>
            </div>

            <div className='absolute right-4 top-4 col-span-2 grid grid-rows-[1fr_1fr] gap-2 self-center'>
                <MultiButton
                    onChange={setSpeakerOnly}
                    value={speakerOnly}
                    labels={['All', 'Speaker Only']}
                    values={[false, true]}
                    className={'rounded-md text-sm'}
                    unSelectedClassName='text-gray-500 bg-gray-300 '
                    selectedClassName='bg-green-500 text-white'
                />
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

            <div className='flex flex-grow flex-col gap-2'>
                <button
                    onClick={handleReset}
                    className='text-md col-span-2 rounded-md border bg-blue-400/70 px-3 py-2 text-black'>
                    Reset All
                </button>
                <div className='flex flex-grow snap-x snap-mandatory flex-row overflow-x-auto *:flex-shrink-0'>
                    <div className='grid w-full snap-center snap-always grid-cols-[auto_1fr] p-2'>
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
                    <div className='grid w-full snap-center snap-always grid-cols-[auto_1fr] p-2'>
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

                    <div className='grid w-full snap-center snap-always grid-cols-[auto_1fr] p-2'>
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
                    {speakerOnly || (
                        <>
                            <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                                Leave:{' '}
                                <span className='rounded-lg bg-black/15 p-2 py-1'>
                                    {autoLeave * 2}
                                </span>
                            </p>
                        </>
                    )}

                    <p
                        className={` text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center ${speakerOnly ? 'col-span-2 max-h-12' : ''} `}>
                        Speaker:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoSpeaker * 5 +
                                teleSpeaker * 2 +
                                ampedTeleSpeaker * 5}
                        </span>
                    </p>

                    {speakerOnly || (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScoreCalculator;
