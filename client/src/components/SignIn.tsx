import React from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';

function SignIn() {
    const [event, setEvent] = React.useState('');

    const handleChangeEvent = (event: SelectChangeEvent) => {
        setEvent(event.target.value as string);
    };

    const [alliance, setAlliance] = React.useState<string | null>('left');

    const handleChangeAlliance = (
        event: React.MouseEvent<HTMLElement>,
        newAlliance: string | null
    ) => {
        setAlliance(newAlliance);
    };

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

    return (
        <div>
            <p className='text-lg'>Scouter Sign-In</p>
            <Box
                component='form'
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete='off'>
                <TextField
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                />
            </Box>

            <Box sx={{ maxWidth: 120 }}>
                <FormControl fullWidth required>
                    <InputLabel id='demo-simple-select-label'>Event</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={event}
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
        </div>
    );
}

export { SignIn };
