import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material';
import React from "react";

function PitApp() {


    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
        
    });

    const ToggleButton2 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#323aa8',
        },
    });

    const [scoreStates, setScoreStates] = React.useState(["scoreState1", "scoreState1", "scoreState1"]);


    const handleScoreChange = (index: number) => {
        switch (scoreStates[index]) {
           case "scoreState1":
             setScoreStates(prevScoreStates => {
               const newScoreStates = [...prevScoreStates];
               newScoreStates[index] = "scoreState2";
               return newScoreStates;
             });
             break;
           case "scoreState2":
             setScoreStates(prevScoreStates => {
               const newScoreStates = [...prevScoreStates];
               newScoreStates[index] = "scoreState3";
               return newScoreStates;
             });
             break;
           case "scoreState3":
             setScoreStates(prevScoreStates => {
               const newScoreStates = [...prevScoreStates];
               newScoreStates[index] = "scoreState1";
               return newScoreStates;
             });
             break;
           default:
             setScoreStates(prevScoreStates => {
               const newScoreStates = [...prevScoreStates];
               newScoreStates[index] = "scoreState1";
               return newScoreStates;
             });
        }
       };
       
       
    return (
        <>
            <h1 className="text-center">Pit App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            <h1 className="text-center">Team Number</h1>
            <br></br>



            <h1 className="text-center">Where can they score from? Choose all that apply</h1>
            <br></br>
            <div className="place-content-center mx-auto w-min !flex pad">
            <ToggleButton1
              value="scoreState1"
              aria-label="scoreState1"
              onClick={() => handleScoreChange(0)}
              sx={{ backgroundColor: scoreStates[0] === "scoreState1" ? "white" : scoreStates[0] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
              Near
            </ToggleButton1>

            <ToggleButton1
             value="scoreState2"
             aria-label="scoreState2"
             onClick={() => handleScoreChange(1)}
             sx={{ backgroundColor: scoreStates[1] === "scoreState1" ? "white" : scoreStates[1] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
             Mid
            </ToggleButton1>

            <ToggleButton1
             value="scoreState3"
             aria-label="scoreState3"
             onClick={() => handleScoreChange(2)}
             sx={{ backgroundColor: scoreStates[2] === "scoreState1" ? "white" : scoreStates[2] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
             Far
            </ToggleButton1>
            </div>




            <h1 className="text-center">Number of batteries?</h1>
            <br></br>

            <h1 className="text-center">Auto Capability?</h1>
            <br></br>
            <h1 className="text-center">Team role?</h1>
            <br></br>
            <ToggleButtonGroup className='place-content-center mx-auto w-min !flex'>
            <ToggleButton1 value='Scoring'>Scoring</ToggleButton1>
            <ToggleButton1 value='Defense'>Defense</ToggleButton1>
            <ToggleButton1 value='Support'>Support</ToggleButton1>
            <ToggleButton1 value='All-Round'>All-Round</ToggleButton1>
            </ToggleButtonGroup>
            <h1 className="text-center">Drivetrain type?</h1>
            <br></br>
            <ToggleButtonGroup className='place-content-center mx-auto w-min !flex' exclusive>
            <ToggleButton2 value='tank'>Tank</ToggleButton2>
            <ToggleButton2 value='Swerve'>Swerve</ToggleButton2>
            <ToggleButton2 value='MECANUM'>Mecanum</ToggleButton2>
            <ToggleButton2 value='other'>Other</ToggleButton2>
            </ToggleButtonGroup>

            <h1 className="text-center">Anything else of note?</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="text"></input>


        </>
    );
}

export default PitApp;
