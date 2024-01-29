import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material';

function PitApp() {


    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
    });


    return (
        <>
            <h1>Pit App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            <h1>Team Number</h1>
            <br></br>

            <h1>Where can they score from? Choose all that apply</h1>
            <br></br>
            {/* <ToggleButton1
            value=''
            selected={}
            onChange={}
            className='bg-red-400 font-serif'>Far</ToggleButton1> 
            <ToggleButton1
            value=''
            selected={}
            onChange={}
            className='bg-red-400 font-serif'>Mid</ToggleButton1> 
            <ToggleButton1
            value=''
            selected={}
            onChange={}
            className='bg-red-400 font-serif'>Close</ToggleButton1> */}
            <h1>Number of batteries?</h1>
            <br></br>

            <h1>Auto Capability?</h1>
            <br></br>
            <h1>Team role?</h1>
            <br></br>
            <ToggleButtonGroup className='place-content-center'>
            <ToggleButton1 value='Scoring'>Scoring</ToggleButton1>
            <ToggleButton1 value='Defense'>Defense</ToggleButton1>
            <ToggleButton1 value='Support'>Support</ToggleButton1>
            <ToggleButton1 value='All-Round'>All-Round</ToggleButton1>
            </ToggleButtonGroup>
            <h1>Drivetrain type?</h1>
            <br></br>
            <ToggleButtonGroup className='place-content-center' exclusive>
            <ToggleButton1 value='tank'>Tank</ToggleButton1>
            <ToggleButton1 value='Swerve'>Swerve</ToggleButton1>
            <ToggleButton1 value='MECANUM'>Mecanum</ToggleButton1>
            <ToggleButton1 value='other'>Other</ToggleButton1>
            </ToggleButtonGroup>

            <h1>Anything else of note?</h1>
            <input className='border-1 rounded-lg border border-gray-700 text-4xl' type="text"></input>


        </>
    );
}

export default PitApp;
