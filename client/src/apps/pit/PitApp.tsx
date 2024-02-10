import MultiButton from '../../components/MultiButton';
//import ToggleButton from '../../components/ToggleButton'
import React, { useState } from 'react';
import Checkbox from '../../components/Checkbox';


function PitApp() {


  const [autoInputValues, setAutoInputValues] = useState(['']);


  const Input = ({ value, onChange }) => {
    return <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-3xl text-center' type="text" placeholder="Type and #" />;
      value={value}
      onChange={onChange}
     };

     const handleAutoInputChange = (index, event) => {
      const newAutoInputValues = [...autoInputValues];
      newAutoInputValues[index] = event.target.value;
      setAutoInputValues(newAutoInputValues);
    };

  const [role, setRole] = useState<'scoring' | 'defense' | 'support' | 'all-round'>();
  const [drivetrain, setDrivetrain] = useState<'tank' | 'swerve' | 'MECANUM' | 'other'>();
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [batteryNumber, setBatteryNumber] = useState(Number);
  const [teamNumber, setTeamNumber] = useState(Number);
  const [autoList, setAutoList] = useState([<Input key={0} value={autoInputValues[0]} onChange={(event) => handleAutoInputChange(0, event)} />]);  


  const inputBattery = {
    width: '70px',
    height: '50px',
  };
  const inputTeamNum = {
    width: '150px',
    height: '50px',
  };

  
   

  const addAnotherAuto = () => {
    setAutoList([...autoList, <Input key={autoList.length} value={''} onChange={(event) => handleAutoInputChange(autoList.length, event)} />]);
    setAutoInputValues([...autoInputValues, '']);
  }; 

   const handleAdditionalNotes = (event) => {
    setAdditionalNotes(event.target.value);
  };
  const handleBatteryNumber = (event) => {
    setBatteryNumber(event.target.value);
  };
  const handleTeamNumber = (event) => {
    setTeamNumber(event.target.value);
  };


    return (
        <>
            <div className='bg-gray-700'>
            <div className="border border-neutral-900 bg-gray-800">
              <br/>
              <h1 className="text-center text-white text-3xl mb-4">Pit App</h1>
            
            </div>

            <br/>
            
            <br/>
            
            <div className="flex justify-center items-center">
            <div className="flex flex-col items-center bg-emerald-200 border-emerald-700 border-4 h-24 w-1/4 justify-center rounded-lg">
            <h1 className="text-center">Team Number</h1>
            <input min={0} onChange={handleTeamNumber} value={teamNumber} style={inputTeamNum} className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" placeholder='Team#'></input>
            </div>
            </div>

            <br></br>


            
            <h1 className="text-center text-white">What can they score? Choose all that apply</h1>
            
            <div className="place-content-center mx-auto w-min !flex pad">
            
            <br></br>
            
            <div className="flex items-center whitespace-nowrap">
              <Checkbox className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="ampNotes" className="cursor-pointer text-white select-none mr-4">Amp Notes</label>
              </div>
              <br/>
              <div className="flex items-center whitespace-nowrap">
              <Checkbox className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="ampNotes" className="cursor-pointer text-white select-none mr-4">Speaker Notes</label>
              </div>
              <br/>
              <div className="flex items-center whitespace-nowrap">
              <Checkbox className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="ampNotes" className="cursor-pointer text-white select-none mr-4">Trap Notes</label>
              </div>
              <br/>
              <div className="flex items-center whitespace-nowrap">
              <Checkbox className="form-checkbox h-5 w-5 text-blue-600" />
              <label htmlFor="ampNotes" className="cursor-pointer text-white select-none mr-4">Climbing Capability</label>
              </div>
              
              </div>
              <br/>
              <br/>

            <div className="flex justify-center items-center">
            <div className="flex flex-col items-center bg-emerald-200 border-emerald-700 border-4 h-24 w-1/4 justify-center rounded-lg ">
            <h1 className="text-center">Number of Batteries?</h1>
            <input min={0} onChange={handleBatteryNumber} value={batteryNumber} style={inputBattery} className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" placeholder="0"></input>
            </div>
            </div>
            
            <br></br>
            <h1 className="text-center text-white">Auto Capability?</h1>
            
            <div>
            {autoList}
            <br/>
            <button className="bg-lime-300 font-sans text-lg font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-2 py-2 shadow-xl place-content-center mx-auto !flex pad '" onClick={addAnotherAuto}>Add input</button>
            </div>

            <br></br>
            <div className="flex justify-center items-center">
            <div className="flex flex-col items-center bg-emerald-200 border-emerald-700 border-4 h-40 w-1/2 justify-center rounded-lg">
              <h1 className="text-center">Team role?</h1>
              <br/>
            <div className='flex justify-center space-x-4'>
              <MultiButton
              onChange={setRole}
              value={role}
              labels={['Scoring', 'Defense', 'Support', 'All-Round']}
              values={['scoring', 'defense', 'support', 'all-round']}
              className={['place-content-center mx-auto w-min !flex whitespace-nowrap', 'place-content-center mx-auto w-min !flex whitespace-nowrap', 'place-content-center mx-auto w-min !flex whitespace-nowrap', 'place-content-center mx-auto w-min !flex whitespace-nowrap' ]}
              />
              </div>
              </div>
              </div>
              
           
            <br></br>
            <div className="flex justify-center items-center ">
            <div className="flex flex-col items-center bg-emerald-200 border-emerald-700 border-4 h-40 w-1/2 justify-center rounded-lg ">
            <div className='flex flex-col items-center '>
            <h1 className="text-center">Drivetrain type?</h1>
            <br/>
            <div className='flex justify-center space-x-4'>
            <MultiButton
            onChange={setDrivetrain}
            value={drivetrain}
            labels={['Tank', 'Swerve', 'Mecanum', 'Other']}
            values={['tank','swerve','MECANUM', 'other']}
            className={['place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex' ]}
            />
            </div>
            </div>
            </div>
            </div>
            <br></br>

            <h1 className="text-center text-white">Additional Notes?</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' onChange={handleAdditionalNotes} value={additionalNotes} type="text"></input>

            <br></br>
            <button className='bg-green-500 font-sans text-4xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl place-content-center mx-auto w-min !flex pad'>Submit</button>
            </div>
        </>
    );
}

export default PitApp;
