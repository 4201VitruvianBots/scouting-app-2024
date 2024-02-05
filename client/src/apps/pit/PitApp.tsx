//import { ToggleButton, ToggleButtonGroup } from "@mui/material";
//import BackHome from "../../components/BackHome";
//import HomeIcon from '@mui/icons-material/Home';
import { Dispatch, SetStateAction, useState } from 'react';
import MultiButton from '../../components/MultiButton';
import ToggleButton from '../../components/ToggleButton'
import React from 'react';
import { ClimbPosition, TeamRolePit, DrivetrainPit } from 'requests';


function PitApp({
  setClimb,
  climbPosition
} : {
  setClimb: Dispatch<SetStateAction<ClimbPosition>>;
  climbPosition: ClimbPosition;
}
  
) {

  const [alliance, setAlliance] = useState(false); //false=red, true=blue, null=hollow purple

  const handleClimb = (
    newClimb: ClimbPosition
) => {
    setClimb(newClimb);
};

const handleImage = () => {
    setAlliance(!alliance);
};


  const [role, setRole] = useState<'scoring' | 'defense' | 'support' | 'all-round'>();
  const [drivetrain, setDrivetrain] = useState<'tank' | 'swerve' | 'MECANUM' | 'other'>();
  const [scoreStates, setScoreStates] = React.useState(["scoreState1", "scoreState1", "scoreState1"]);

  const Input = () => {
    return <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-3xl text-center' type="text" placeholder="Type and #" />;
   };
   const [inputList, setInputList] = useState([<Input key={0} />]);

   const onAddBtnClick = event => {
      setInputList([...inputList, <Input key={inputList.length} />]);
   };   


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

            <div className="border border-green-900">
              <br/>
              <h1 className="text-center text-3xl">Pit App</h1>
            </div>

            <br/>
            
            <br/>
            <h1 className="text-center">Team Number</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number"></input>
            <br></br>



            <h1 className="text-center">Where can they score from? Choose all that apply</h1>
            
            <div className="place-content-center mx-auto w-min !flex pad">
            {/* <ToggleButton
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
            </ToggleButton> */}
            </div>
            <br></br>



            <h1 className="text-center">Number of batteries?</h1>
            <input className='place-content-center mx-auto w-min !flex border-1 rounded-lg border border-gray-700 text-4xl text-center' type="number" placeholder="0"></input>
            <br></br>
            <h1 className="text-center">Auto Capability?</h1>
            
            <div>
            {inputList}
            <button className="bg-lime-300 font-sans text-lg font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-2 py-2 shadow-xl place-content-center mx-auto !flex pad'" onClick={onAddBtnClick}>Add input</button>
            </div>
            <br></br>
            <h1 className="text-center">Team role?</h1>
            
             <MultiButton 
                onChange={} value={} 
                labels={['Scoring', 'Defense', 'Support', 'All-Round']}
                values={['scoring', 'defense', 'support', 'all-round']}
                className={
                ? [/*blue*/ 'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', '', '', ''] 
                : [/*red*/  'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', 'place-content-center mx-auto w-min !flex', '', '', '' ]}/> 

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
            <button className='bg-green-500 font-sans text-4xl font-semibold text-black md:bg-opacity-50 border-1 rounded-lg border border-gray-700 px-4 py-4 shadow-xl place-content-center mx-auto w-min !flex pad'>Submit</button>
            
        </>
    );
}

export default PitApp;
