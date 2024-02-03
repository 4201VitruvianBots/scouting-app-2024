import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from "react";

import Dropdown from '../../components/dropdowns';


function PitApp() {

  const [role, setRole] = useState<'scoring' | 'defense' | 'support' | 'all-round'>();
  const [drivetrain, setDrivetrain] = useState<'tank' | 'swerve' | 'MECANUM' | 'other'>();
  const [autoCapability, setAutoCapability] = useState<'e' | 'a' | 'sports' | 'inthegame'>(); //this is placeholder
  const [scoreStates, setScoreStates] = React.useState(["scoreState1", "scoreState1", "scoreState1"]);



  // const ParentComponent: React.FC = () => {
  //  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  
  //  const options: Option[] = [
  //     { label: "Option 1", value: "1" },
  //     { label: "Option 2", value: "2" },
  //     // Add more options as needed
  //  ];
  
  //  return (
  //     <div>
  //       <Dropdown options={options} onSelect={setSelectedOption} />
  //       {/* Use selectedOption as needed */}
  //     </div>
  //  );
  // };
  
   


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
            <br/>
            <br/>
            <h1 className="text-center text-3xl">Pit App</h1>
            <br/>
            <BackHome
                    link='/'
                    className="place-content-center mx-auto w-min !flex"
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            <br/>
            <h1 className="text-center">Team Number</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number"></input>
            <br></br>



            <h1 className="text-center">Where can they score from? Choose all that apply</h1>
            
            <div className="place-content-center mx-auto w-min !flex pad">
            <ToggleButton
              value="scoreState1"
              aria-label="scoreState1"
              onClick={() => handleScoreChange(0)}
              sx={{ backgroundColor: scoreStates[0] === "scoreState1" ? "white" : scoreStates[0] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
              Near
            </ToggleButton>

            <ToggleButton
             value="scoreState2"
             aria-label="scoreState2"
             onClick={() => handleScoreChange(1)}
             sx={{ backgroundColor: scoreStates[1] === "scoreState1" ? "white" : scoreStates[1] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
             Mid
            </ToggleButton>

            <ToggleButton
             value="scoreState3"
             aria-label="scoreState3"
             onClick={() => handleScoreChange(2)}
             sx={{ backgroundColor: scoreStates[2] === "scoreState1" ? "white" : scoreStates[2] === "scoreState2" ? "#a4ebaf" : "#FC8066" }}>
             Far
            </ToggleButton>
            </div>
            <br></br>



            <h1 className="text-center">Number of batteries?</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" value='0'></input>
            <br></br>
            <h1 className="text-center">Auto Capability?</h1>
            
            <ToggleButtonGroup className='place-content-center mx-auto w-min !flex' value={autoCapability} onChange={(_, value) => setAutoCapability(value)}>
            <ToggleButton value='e'>e</ToggleButton>
            <ToggleButton value='a'>a</ToggleButton>
            <ToggleButton value='sports'>sports</ToggleButton>
            <ToggleButton value='inthegame'>itsinthegame</ToggleButton>
            </ToggleButtonGroup>
            <br></br>
            <h1 className="text-center">Team role?</h1>
            
            <ToggleButtonGroup className='place-content-center mx-auto w-min !flex' value={role} onChange={(_, value) => setRole(value)}>
            <ToggleButton value='scoring'>Scoring</ToggleButton>
            <ToggleButton value='defense'>Defense</ToggleButton>
            <ToggleButton value='support'>Support</ToggleButton>
            <ToggleButton value='all-round'>All-Round</ToggleButton>
            </ToggleButtonGroup>
            <br></br>
            <h1 className="text-center">Drivetrain type?</h1>
            
            <ToggleButtonGroup className='place-content-center mx-auto w-min !flex' exclusive value={drivetrain} onChange={(_, value) => setDrivetrain(value)}>
            <ToggleButton value='tank'>Tank</ToggleButton>
            <ToggleButton value='swerve'>Swerve</ToggleButton>
            <ToggleButton value='MECANUM'>Mecanum</ToggleButton>
            <ToggleButton value='other'>Other</ToggleButton>
            </ToggleButtonGroup>
            <br></br>

          

            <h1 className="text-center">Additional Notes?</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="text"></input>

            <br></br>
            <button className='bg-green-500 font-sans text-4xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl'>Submit</button>
            
        </>
    );
}

export default PitApp;
