import MultiButton from '../../components/MultiButton';
//import ToggleButton from '../../components/ToggleButton'
import React, { useState } from 'react';
import Checkbox from '../../components/Checkbox';


function PitApp() {

  
  
     const handleAutoInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const newAutoInputValues = [...autoInputValues];
      newAutoInputValues[index] = event.target.value;
      setAutoInputValues(newAutoInputValues);
    };

    const removeAutoInput = (id: number) => {
     const newInputValues = autoInputValues.filter((_, i) => i !== id);
     setAutoInputValues(newInputValues);
  };
    const addAnotherAuto = () => {
     setAutoInputValues([...autoInputValues, '']);
  };


  const [autoInputValues, setAutoInputValues] = useState(['']);
  const [role, setRole] = useState<'scoring' | 'defense' | 'support' | 'all-round'>();
  const [drivetrain, setDrivetrain] = useState<'tank' | 'swerve' | 'MECANUM' | 'other'>();
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
  
  const handleSubmit = async() => {
    const data: PitFile = {
     scouterName: 'bcdsh',
     teamNumber,
     
    }
    }

  
  
  
  
 
  const inputBattery = {
    width: '150px',
    height: '50px',
  };
  const inputTeamNum = {
    width: '150px',
    height: '50px',
  };



    return (
        <>
            <div className='bg-[#171c26]'>
            <div className="border border-neutral-900 bg-gray-800 mb-7">
              <br/>
              <h1 className="text-center text-white text-3xl mb-4">Pit App</h1>
            
            </div>


            <div className="flex justify-center items-center mb-8">
            <div className="flex flex-col items-center bg-[#2f3646] border-[#2f3646] border-4 h-24 w-2/4 justify-center rounded-lg">
            <h1 className="text-center text-white">Team Number</h1>
            <input min={0} onChange={event => setTeamNumber(parseInt(event.target.value))} value={teamNumber} style={inputTeamNum} className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" placeholder='Team#'></input>
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
              <h1 className="text-center text-white mb-4">Auto Capability?</h1>
              <div className="flex flex-col items-center justify-center space-y-4">
                {autoInputValues.map((value, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <input
                  className='w-2/3 border-1 rounded-lg border border-gray-700 text-3xl text-center'
                  type="text"
                  placeholder="Type and #"
                  value={value}
                  onChange={(event) => handleAutoInputChange(index, event)}/>
                  <button
                  className="bg-red-400 font-sans font-semibold text-black text-sm md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-2 py-2"
                  onClick={() => removeAutoInput(index)}>
                    Remove
                    </button>
                  </div>
               ))}
            </div>
            <button className="bg-[#48c55c] font-sans text-lg font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-2 py-2 shadow-xl place-content-center mx-auto !flex pad mt-4 mb-5" onClick={addAnotherAuto}>Add input</button>
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
            
            <h1 className="text-center text-white">Additional Notes?</h1>
            <input className='place-content-center mx-auto w-5/6 !flex border-1 rounded-lg border border-gray-700 text-4xl text-center mb-3' onChange={event => setAdditionalNotes(event.target.value)} value={additionalNotes} type="text"></input>

            <button onClick={handleSubmit} className='bg-[#48c55c] font-sans text-4xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl place-content-center mx-auto w-min !flex pad '>Submit</button>
            </div>
        </>
    );
}

export default PitApp;
