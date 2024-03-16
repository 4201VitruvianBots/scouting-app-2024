//import ToggleButton from '../../components/ToggleButton'
import React, { Dispatch, SetStateAction, useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';

function decrement(setter:Dispatch<SetStateAction<number>>) {
    return () => setter((currentValue) => (
        currentValue>0 ? currentValue-1 : currentValue 
        
    
    ))

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
    const [cimbSpot, setClimbSpot] = useState(Number);
    const [trap, setTrap] = useState(Number);
    const [harmony, setHarmony] = useState(Number);

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
        <div className='flex h-screen flex-col'>
            <div className='mb-7 border border-neutral-900 bg-gray-800'>
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

            <div className='grid flex-grow grid-flow-row grid-cols-[auto_auto] justify-center gap-1 '>
                <button
                    onClick={handleReset}
                    className='text-md col-span-2 rounded-md border bg-blue-400/70 px-3 py-2 text-black'>
                    Reset All
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setAutoLeave)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setAutoLeave(autoLeave + 1)}>
                    + Auto Leave ({autoLeave})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setAutoSpeaker)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() =>  setAutoSpeaker(autoSpeaker + 1)}>
                    + Auto Speaker ({autoSpeaker})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setAutoAmp)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() =>  setAutoAmp(autoAmp + 1)}>
                    + Auto Amp ({autoAmp})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setTeleSpeaker)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() =>  setTeleSpeaker(teleSpeaker + 1)}>
                    + Tele Speaker ({teleSpeaker})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setAmpedTeleSpeaker)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setAmpedTeleSpeaker(ampedTeleSpeaker + 1)}>
                    + Amped Tele Speaker ({ampedTeleSpeaker})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setTeleAmp)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() =>  setTeleAmp(teleAmp + 1)}>
                    + Tele Amp ({teleAmp})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setPark)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() =>  setPark(park + 1)}>
                    + Park ({park})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setClimb)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setClimb(climb + 1)}>
                    + Climb ({climb})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setClimbSpot)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setClimbSpot(cimbSpot + 1)}>
                    + Spotlit Climb ({cimbSpot})
                </button>

                <button
                    className='text-md blue rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setTrap)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setTrap(trap + 1)}>
                    + Trap Note ({trap})
                </button>

                <button
                    className='text-md rounded-md border bg-red-400 px-3 py-2 text-zinc-100 '
                    onClick={decrement(setHarmony)}>
                    -
                </button>
                <button
                    className='text-md min-w-55 rounded-md border bg-slate-600 px-3 py-2  text-zinc-100'
                    onClick={() => setHarmony(harmony + 1)}>
                    + Harmony ({harmony})
                </button>

                <div className='col-span-2 grid grid-cols-2 justify-center gap-2 bg-slate-200 p-3 '>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Leave:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoLeave * 2}
                        </span>
                    </p>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center '>
                       Speaker:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoSpeaker*5+
                            teleSpeaker * 2 +
                                ampedTeleSpeaker * 5 +
                                teleAmp * 1}
                        </span>
                    </p>
                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Amp:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                        {autoAmp*2+
                            teleAmp*1}
                            
                        </span>
                    </p>

                    <p className='text-black-100 text-md rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Stage:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                        {park * 1 +
                                climb * 3 +
                                cimbSpot * 4 +
                                trap * 5 +
                                harmony * 2}
                        </span>
                    </p>
                    {/* <p className='text-black-100 text-md col-span-2 self-center rounded-md border-green-800 bg-green-400/70 px-3 py-2 text-center'>
                        Total Points:{' '}
                        <span className='rounded-lg bg-black/15 p-2 py-1'>
                            {autoLeave * 2 +
                                autoSpeaker * 5 +
                                autoAmp * 2 +
                                teleSpeaker * 2 +
                                ampedTeleSpeaker * 5 +
                                teleAmp * 1 +
                                park * 1 +
                                climb * 3 +
                                cimbSpot * 4 +
                                trap * 5 +
                                harmony * 2}
                        </span>
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default ScoreCalculator;
