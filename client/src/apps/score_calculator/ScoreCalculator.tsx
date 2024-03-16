
//import ToggleButton from '../../components/ToggleButton'
import React, { useState } from 'react';

import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';



function ScoreCalculator() {
   
  const [autoLeave, setAutoLeave] = useState(Number)
  const [autoSpeaker, setAutoSpeaker] = useState(Number)
  const [autoAmp, setAutoAmp] = useState(Number)
  const [teleSpeaker, setTeleSpeaker] = useState(Number)
  const [ampedTeleSpeaker, setAmpedTeleSpeaker] = useState(Number)
  const [teleAmp, setTeleAmp] = useState(Number)
  const [park, setPark] = useState(Number)
  const [climb, setClimb] = useState(Number)
  const [cimbSpot, setClimbSpot] = useState(Number)
  const [trap, setTrap] = useState(Number)
  const [harmony, setHarmony] = useState(Number)
  const [autoPoints, setAutoPoints] = useState(Number)


  
    setAutoPoints((autoLeave*2) + (autoSpeaker*5) + (autoAmp*2))

  

    return (
        <>
            <div className="border border-neutral-900 bg-gray-800 mb-7">
              <br/>
              <h1 className="text-center text-[#48c55c] text-3xl mb-4 font-bold">Score Calculator</h1>
            
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
       
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setAutoLeave(autoLeave - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setAutoLeave(autoLeave + 1)}>+ Auto Leave ({autoLeave})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setAutoSpeaker(autoSpeaker - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setAutoSpeaker(autoSpeaker + 1)}>+ Auto Speaker ({autoSpeaker})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setAutoAmp(autoAmp - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setAutoAmp(autoAmp + 1)}>+ Auto Amp ({autoAmp})</button>
        </div>
          
        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setTeleSpeaker(teleSpeaker - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setTeleSpeaker(teleSpeaker + 1)}>+ Tele Speaker ({teleSpeaker})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setAmpedTeleSpeaker(ampedTeleSpeaker - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setAmpedTeleSpeaker(ampedTeleSpeaker + 1)}>+ Amped Tele Speaker ({ampedTeleSpeaker})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setTeleAmp(teleAmp - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setTeleAmp(teleAmp + 1)}>+ Tele Amp ({teleAmp})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setPark(park - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setPark(park + 1)}>+ Park ({park})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setClimb(climb - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setClimb(climb + 1)}>+ Climb ({climb})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setClimbSpot(cimbSpot - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setClimbSpot(cimbSpot + 1)}>+ Spotlit Climb ({cimbSpot})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setTrap(trap - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setTrap(trap + 1)}>+ Trap Note ({trap})</button>
        </div>

        <div className='flex justify-center'>
            <button className='text-zinc-100 text-lg bg-red-400 border rounded-md py-2 px-3 mt-3' onClick={() => setHarmony(harmony - 1)}>-</button>
            <button className='text-zinc-100 text-lg bg-slate-600 border rounded-md py-2 px-3 mt-3 min-w-55' onClick={() => setHarmony(harmony + 1)}>+ Harmony ({harmony})</button>
        </div>
          
         
          <p>{autoPoints}</p>
          
          </>
                
    );
}

export default ScoreCalculator;
