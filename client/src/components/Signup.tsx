import { SetStateAction, useContext, useState } from 'react';


import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
//import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';
//import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import React from 'react';
import { Margin } from '@mui/icons-material';
import { AllianceContext, ScouterNameContext, SetAllianceContext, SetScouterNameContext } from '../SignInContext';
import { RobotPosition } from 'server/requests';


// "savedValue" is where the signin user is saved
function Signup() {
    
    const [showPopup, setShowPopup] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [savedValue, setSavedValue] = useState('');

   const scouterName = useContext (ScouterNameContext);
   const setscouterName = useContext (SetScouterNameContext);
   const alliance = useContext (AllianceContext);
   const setalliance = useContext (SetAllianceContext)

    const ToggleButtonRed = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#a83232',
        },
    });

    const ToggleButtonBlue = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#323aa8',
        },
    });

    

    const handleChangeAlliance = (
        event: React.MouseEvent<HTMLElement>,
        newAlliance: RobotPosition
    ) => {
        setalliance(newAlliance);
    };

    const handleChangeUser = (event: SelectChangeEvent) => {
        setscouterName (event.target.value as string);
    };
    
     const handleSaveAndClose = () => {
        setSavedValue(inputValue);
        setShowPopup(false);}

    return (
    
        
        <div className="App">
        <button className='border-1 rounded-lg border border-gray-700 px-4' onClick={() => setShowPopup(true)}>Sign Out</button>
  
        {showPopup && (
           
            // commented code below is for preventing people from pressing buttons beyond the popup, but it also affects the opacity of he popup so its commented for now
          <div className='bg-neutral-700/75 p-5 fixed top-0 bottom-0 left-0 right-0 z-10'>
          <div className='flex flex-col items-center rounded-xl border-green-900 border-8 text-5xl text-center align-middle bg-neutral-200 p-5 fixed top-40 bottom-40 left-40 right-40 z-10'>
            Sign in with your name please :D
            
           
            
            <div className="flex justify-center items-center mt-20">
            <input className='border-1 rounded-lg border border-gray-700 text-4xl' type="text" value={scouterName} onChange={handleChangeUser}></input>
            </div>

            <br/>
            <div className='textArea align-middle'>
                <FormControl>
                    <FormLabel id='demo-controlled-radio-buttons-group' sx={{fontSize:'1em'}}>
                        Alliance
                    </FormLabel>
                </FormControl>

                <ToggleButtonGroup
                    value={alliance}
                    exclusive
                    onChange={handleChangeAlliance}
                    aria-label='text alignment'>
                    <ToggleButtonRed value='red_1' aria-label='Red 1'>
                        <p className='font-semibold text-red-500 text-xl bg-5'>Red 1</p>
                    </ToggleButtonRed>
                    <ToggleButtonRed value='red_2' aria-label='Red 2'>
                        <p className='font-semibold text-red-500 text-xl'> Red 2</p>
                    </ToggleButtonRed>
                    <ToggleButtonRed value='red_3' aria-label='Red 3'>
                        <p className='font-semibold text-red-500 text-xl'>Red 3</p>
                    </ToggleButtonRed>
                    <ToggleButtonBlue value='blue_1' aria-label='Blue 1'>
                        <p className='font-semibold text-blue-500 text-xl'>Blue 1</p>
                    </ToggleButtonBlue>
                    <ToggleButtonBlue value='blue_2' aria-label='Blue 2'>
                        <p className='font-semibold text-blue-500 text-xl'>Blue 2</p>
                    </ToggleButtonBlue>
                    <ToggleButtonBlue value='blue_3' aria-label='Blue 3'>
                        <p className='font-semibold text-blue-500 text-xl'>Blue 3</p>
                    </ToggleButtonBlue>
                </ToggleButtonGroup>
            </div>
            <br/>
            <div className="flex justify-center items-center">
            <button className=' bg-green-500 font-sans text-6xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl'
            onClick={handleSaveAndClose}>Sign In</button>
            </div>
            
            <br></br>
            </div>  
            </div>
          
        )}
        </div>
    );
}

export default Signup;