import { SetStateAction, useState } from 'react';


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


// "savedValue" is where the signin user is saved
function Signup() {
    
    const [showPopup, setShowPopup] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [savedValue, setSavedValue] = useState('');

    const [alliance, setAlliance] = React.useState<string | null>('left');
    const [event, setEvent] = React.useState('');

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
        newAlliance: string | null
    ) => {
        setAlliance(newAlliance);
    };

    const handleChangeEvent = (event: SelectChangeEvent) => {
        setEvent(event.target.value as string);
    };


    const handleChangeUser = (event) => {
        setInputValue(event.target.value);
     };
    
     const handleSaveAndClose = () => {
        setSavedValue(inputValue);
        setShowPopup(false);}

    return (
    
        
        <div className="App">
        <button className='border-1 rounded-lg border border-gray-700 px-4' onClick={() => setShowPopup(true)}>Sign Out</button>
  
        {showPopup && (
           
            // commented code below is for preventing people from pressing buttons beyond the popup, but it also affects the opacity of he popup so its commented for now
         //<div className='opacity-75' style={{backgroundColor: 'lightgrey', padding: '20px', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 2}}>
          <div className="rounded-xl border-green-900 border-8 text-5xl opacity-100" style={{backgroundColor: 'lightgray', padding: '20px', position: 'fixed', top: 150, bottom: 150, left: 150, right: 150, zIndex: 1}}>
            Sign In with your name please :D
            
            <br></br>
            <br></br>
            <br></br>
            
            <div className="flex justify-center items-center">
            <input className='border-1 rounded-lg border border-gray-700 text-5xl' type="text" value={inputValue} onChange={handleChangeUser}></input>
            </div>
            <br></br>

            <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth required>
                    <InputLabel id='demo-simple-select-label'>Event</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={event} //uhoh
                        label='Event'
                        onChange={handleChangeEvent}>
                        <MenuItem value={'Port'}>Port Hueneme</MenuItem>
                        <MenuItem value={'LAR'}>LAR</MenuItem>
                    </Select>
                   
                </FormControl>
            </Box>

            <div className='textArea'>
                <FormControl>
                    <FormLabel id='demo-controlled-radio-buttons-group'>
                        ALLIANCE
                    </FormLabel>
                </FormControl>

                <ToggleButtonGroup
                    value={alliance}
                    exclusive
                    onChange={handleChangeAlliance}
                    aria-label='text alignment'>
                    <ToggleButtonRed value='Red 1' aria-label='Red 1'>
                        <p className='font-semibold text-red-500 bg-5'>Red 1</p>
                    </ToggleButtonRed>
                    <ToggleButtonRed value='Red 2' aria-label='Red 2'>
                        <p className='font-semibold text-red-500'> Red 2</p>
                    </ToggleButtonRed>
                    <ToggleButtonRed value='Red 3' aria-label='Red 3'>
                        <p className='font-semibold text-red-500'>Red 3</p>
                    </ToggleButtonRed>
                    <ToggleButtonBlue value='Blue 1' aria-label='Blue 1'>
                        <p className='font-semibold text-blue-500'>Blue 1</p>
                    </ToggleButtonBlue>
                    <ToggleButtonBlue value='Blue 2' aria-label='Blue 2'>
                        <p className='font-semibold text-blue-500'>Blue 2</p>
                    </ToggleButtonBlue>
                    <ToggleButtonBlue value='Blue 3' aria-label='Blue 3'>
                        <p className='font-semibold text-blue-500'>Blue 3</p>
                    </ToggleButtonBlue>
                </ToggleButtonGroup>
            </div>
            <div className="flex justify-center items-center">
            <button className=' bg-green-500 font-sans text-6xl  font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 shadow-xl'
            onClick={handleSaveAndClose}>Sign In</button>
            </div>
            <br></br>
            </div>  
        //  </div>
          
        )}
        </div>
    );
}

export default Signup;