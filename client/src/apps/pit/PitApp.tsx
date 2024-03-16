import MultiButton from '../../components/MultiButton';
//import ToggleButton from '../../components/ToggleButton'
import React, { useEffect, useState } from 'react';
import Checkbox from '../../components/Checkbox';
import { PitFile, teamRoles, drivebase } from 'requests';
import LinkButton from '../../components/LinkButton';
import { MaterialSymbol } from 'react-material-symbols';
import TeamDropdown from '../../components/TeamDropdown';
import Dialog from '../../components/Dialog';
import SignIn from '../../components/SignIn';
import ConeStacker from '../../components/ConeStacker';
import { usePreventUnload } from '../../lib/usePreventUnload';
import ImageUploader from '../../components/ImageUploader';
import { useFetchJson } from '../../lib/useFetch';
import { postJson } from '../../lib/postJson';


function PitApp() {
    usePreventUnload();
  
  
  const [scoutedTeams, refreshScoutedTeams] = useFetchJson<number[]>('/data/pit/scouted-teams');

  const [sending, setSending] = useState(false);

  const [autoInputValues, setAutoInputValues] = useState(['']);
  const [role, setRole] = useState<teamRoles|undefined>();
  const [drivetrain, setDrivetrain] = useState<drivebase| undefined>();
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [batteryNumber, setBatteryNumber] = useState(Number);
  const [teamNumber, setTeamNumber] = useState(Number);
  
  const [ampChecked, setAmpChecked] = useState(false);
  const [trapChecked, setTrapChecked] = useState(false);
  const [speakerChecked, setSpeakerChecked] = useState(false);
  const [climbingChecked, setClimbingChecked] = useState(false);
  const [chainTraversalChecked, setChainTraversalChecked] = useState(false);
  const [ampPrefChecked, setAmpPrefChecked] = useState(false);
  const [trapPrefChecked, setTrapPrefChecked] = useState(false);
  const [speakerPrefChecked, setSpeakerPrefChecked] = useState(false);
  const [climbingPrefChecked, setClimbingPrefChecked] = useState(false);

  const [scouterName, setScouterName] = useState('');
  const [robotImage, setRobotImage] = useState('');
  useEffect(() => {
    const timeout = setInterval(refreshScoutedTeams, 60 * 1000);
    return () => clearInterval(timeout);
  }, [refreshScoutedTeams]);
  
  const handleSubmit = async() => {
    if (sending) return;

    if (!drivetrain || !role){
      alert('data is missing :(')
      return
    }

    const data: PitFile = {
     scouterName: 'bcdsh',
     teamNumber,
     capabilities: {
       amp: ampChecked,
       speaker: speakerChecked,
       trap: trapChecked,
       climb: climbingChecked,
       chainTraversal: chainTraversalChecked
     },
     preference: {
        ampPrefer: ampPrefChecked,
        speakerPerfer: speakerPrefChecked,
        trapPrefer: trapPrefChecked,
        climbPrefer: climbingPrefChecked
     },
     autoCapability: autoInputValues,
     teamRole: role,
     pitBatteryCount: batteryNumber,
     drivebase: drivetrain,
     photo: robotImage,
     comments: additionalNotes
    };

    setSending(true);
    try {
      const result = await postJson('/data/pit', data);
      if (!result.ok) throw new Error('Request Did Not Succeed');
      refreshScoutedTeams();
      setAutoInputValues(['']);
      setAmpChecked(false);
      setAmpPrefChecked(false);
      setBatteryNumber(0);
      setAdditionalNotes('');
      setRole(undefined);
      setTeamNumber(0);
      setChainTraversalChecked(false);
      setClimbingChecked(false);
      setClimbingPrefChecked(false);
      setDrivetrain(undefined);
      setTrapChecked(false);
      setTrapPrefChecked(false);
      setSpeakerChecked(false);
      setSpeakerPrefChecked(false);
      setRobotImage('');
    } catch {
      alert('Sending Data Failed');
    }
    setSending(false);
  }

  const inputBattery = {
    width: '150px',
    height: '50px',
  };

    return (
        <>

            <div className='bg-[#171c26]'>
            <div className="border border-neutral-900 bg-gray-800 mb-7">
              <br/>
              <h1 className="text-center text-[#48c55c] text-3xl mb-4 font-bold">Pit App</h1>
            
            </div>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
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
                                className={` ${scouterName ? 'text-green-400' : 'text-gray-400'} snap-none`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                            scouterName={scouterName}
                            onChangeScouterName={setScouterName}
                            pitScouting
                            onSubmit={close}
                            
                        />
                    )}
                </Dialog>
                <ConeStacker />
               
            </div>


            <div className="flex justify-center items-center mb-8">
            <div className="flex flex-col items-center bg-[#2f3646] border-[#2f3646] border-4 h-24 w-2/4 justify-center rounded-lg">
            <h1 className="text-center text-white">Team Number</h1>
            <TeamDropdown onChange={setTeamNumber} value={teamNumber} disabledOptions={scoutedTeams} />
            </div>
            </div>
            


            <h1 className="text-center text-white mb-7 ">Capabilities? Choose all that apply.</h1>
            <div className="place-content-center mx-auto w-min !flex pad flex-wrap">
            <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={ampChecked} onChange={setAmpChecked} className="form-checkbox h-5 w-10 text-blue-600 mr-2" boxClassName='h-7 w-7'/>
              <label htmlFor="ampNotes" className="cursor-pointer text-white select-none mr-4 ml-5">Amp Notes</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={speakerChecked} onChange={setSpeakerChecked} className="form-checkbox h-5 w-10 text-blue-600 ml-5" boxClassName='h-7 w-7'/>
              <label htmlFor="speakerNotes" className="cursor-pointer text-white select-none mr-4 ml-5">Speaker Notes</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={trapChecked} onChange={setTrapChecked} className="form-checkbox h-5 w-10 text-blue-600 mr-2" boxClassName='h-7 w-7'/>
              <label htmlFor="trapNotes" className="cursor-pointer text-white select-none mr-4 ml-5">Trap Notes</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={climbingChecked} onChange={setClimbingChecked} className="form-checkbox h-5 w-10 text-blue-600 ml-16" boxClassName='h-7 w-7'/>
              <label htmlFor="climbingCapability" className="cursor-pointer text-white select-none mr-4 ml-5">Climbing Capability</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={chainTraversalChecked} onChange={setChainTraversalChecked} className="form-checkbox h-5 w-10 text-blue-600 ml-20" boxClassName='h-7 w-7'/>
              <label htmlFor="underChainTraversal" className="cursor-pointer text-white select-none mr-4 ml-5">Under Chain Traversal</label>
              </div>
              </div>


              <h1 className="text-center mt-8 mb-3 text-white">What is their preference? Choose all that apply.</h1>
            <div className="place-content-center mx-auto w-min !flex pad flex-wrap">
            
            <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={ampPrefChecked} onChange={setAmpPrefChecked} className="form-checkbox h-5 w-5 text-blue-600" boxClassName='h-7 w-7' />
              <label htmlFor="ampPreferred" className="cursor-pointer text-white select-none mr-4 ml-5">Amp Preferred?</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={speakerPrefChecked} onChange={setSpeakerPrefChecked} className="form-checkbox h-5 w-5 text-blue-600 ml-7" boxClassName='h-7 w-7' />
              <label htmlFor="speakerPreferred" className="cursor-pointer text-white select-none mr-4 ml-5">Speaker Preferred?</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={trapPrefChecked} onChange={setTrapPrefChecked} className="form-checkbox h-5 w-5 text-blue-600" boxClassName='h-7 w-7' />
              <label htmlFor="trapPreferred" className="cursor-pointer text-white select-none mr-4 ml-5">Trap Preferred?</label>
              </div>
              <div className="flex items-center whitespace-nowrap mb-4">
              <Checkbox checked={climbingPrefChecked} onChange={setClimbingPrefChecked} className="form-checkbox h-5 w-5 text-blue-600 ml-9" boxClassName='h-7 w-7' />
              <label htmlFor="climbPreferred" className="cursor-pointer text-white select-none mr-4 ml-5">Climbing Preferred?</label>
              </div>
              
              </div>

            <div className="flex justify-center items-center mb-8 mt-7">
            <div className="flex flex-col items-center bg-[#2f3646] border-[#2f3646] border-4 h-24 w-2/4 justify-center rounded-lg ">
            <h1 className="text-center text-white">Number of Batteries?</h1>
            <input min={0} onChange={event => setBatteryNumber(parseInt(event.target.value))} value={batteryNumber} style={inputBattery} className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" placeholder="0"></input>
            </div>
            </div>
            
            <div className="ml-1 flex flex-col items-center justify-center">
             
              

            
            </div>

        


            <div className="flex justify-center items-center mb-8">
              <div className="flex flex-col items-center bg-[#2f3646] border-[#2f3646] border-4 h-48 w-3/4 justify-center rounded-lg ">
                <h1 className="text-center text-white font-semibold mb-3">Team role?</h1>
                <div className='grid grid-cols-2 gap-4 justify-center'>
      <MultiButton
        onChange={setRole}
        value={role}
        labels={['Scoring', 'Defense']}
        values={['scoring','defense']}
        className={['px-8 place-content-center mx-auto w-min !flex']}
      />
      <MultiButton
        onChange={setRole}
        value={role}
        labels={['Support', 'All-Round']}
        values={['support', 'all-round']}
        className={['px-8 place-content-center mx-auto w-min !flex']}
      />
    </div>
  </div>
</div>        
           
            <div className="flex justify-center items-center mb-8">
              <div className="flex flex-col items-center bg-[#2f3646] border-[#2f3646] border-4 h-48 w-3/4 justify-center rounded-lg ">
                <h1 className="text-center text-white font-semibold mb-3">Drivetrain type?</h1>
                <div className='grid grid-cols-2 gap-4 justify-center'>
      <MultiButton
        onChange={setDrivetrain}
        value={drivetrain}
        labels={['Tank', 'Swerve']}
        values={['tank','swerve']}
        className={['px-12 place-content-center mx-auto w-min !flex']}
      />
      <MultiButton
        onChange={setDrivetrain}
        value={drivetrain}
        labels={['Mecanum', 'Other']}
        values={['MECANUM', 'other']}
        className={['px-7 place-content-center mx-auto w-min !flex', 'px-10 place-content-center mx-auto w-min !flex']}
      />
    </div>
  </div>
</div>
            <h1 className='text-center text-white my-2 '>Robot Image</h1> 
                <ImageUploader 
                value={robotImage}
                onChange={setRobotImage}
                
                />
            
            <h1 className="text-center text-white pt-6" >Additional Notes?</h1>
            <input className='place-content-center mx-auto w-5/6 !flex border-1 rounded-lg border border-gray-700 text-4xl text-center mb-3' onChange={event => setAdditionalNotes(event.target.value)} value={additionalNotes} type="text"></input>

            <button onClick={handleSubmit} className='bg-[#48c55c] font-sans text-4xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl place-content-center mx-auto w-min !flex pad '>{sending ? 'Sending...' : 'Submit'}</button>
            </div>
        </>
    );
}

export default PitApp;
