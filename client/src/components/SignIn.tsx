import { Dispatch, useEffect, useState } from "react";
import { RobotPosition, SuperPosition } from "requests";
import MultiButton from "./MultiButton";


import TextInput from "./TextInput";

// const [teamNumber, setTeamNumber] = useState<number>();
//     const [matchNumber, setMatchNumber] = useState(1);

function SignIn({
    scouterName,
    onChangeScouterName,
    robotPosition,
    onChangeRobotPosition,
    superScouting,
    pitScouting,
    onSubmit

}:{
    scouterName: string
    onChangeScouterName: Dispatch<string>
    onSubmit: () => void,
} & ( 
    {
        superScouting: true,
        pitScouting?: false,
        robotPosition: SuperPosition | undefined, 
        onChangeRobotPosition: Dispatch<SuperPosition>
    } | {
        superScouting?: false,
        pitScouting?: false,
        robotPosition: RobotPosition | undefined,
        onChangeRobotPosition: Dispatch<RobotPosition>
    }
    | {
        superScouting?: false,
        pitScouting: true
        robotPosition?: undefined,
        onChangeRobotPosition?: undefined
    }

)){
    
    const [showCheck, setShowCheck] = useState<boolean>(false);

    function handleSubmit(){
        setShowCheck(true)
        onSubmit()
       
    }

    useEffect(() => {setShowCheck(false)}, [scouterName, robotPosition])
  
    return (
    <>
        < div className={`w-[400px] selection:box-border grid-cols-2 grid auto-rows-fr ${superScouting ? 'grid-rows-[auto_auto_1fr_1fr]' : pitScouting ? 'grid-rows-[auto_auto]' : 'grid-rows-[auto_auto_1fr_1fr_1fr_1fr]' } gap-3 grid-flow-col justify-center`}>
            <p className='text-green-600 col-span-2 justify-self-center text-2xl font-medium p-1'>Sign-In</p>
            <TextInput className=" text-black col-span-2 outline-double h-[40px] text-xl outline-sky-300 required justify-center " value={scouterName} onChange={onChangeScouterName} placeholder="Name"></TextInput>


         {superScouting ?
            <MultiButton
                 onChange={onChangeRobotPosition} value={robotPosition} 
                labels={['Red', 'Blue']}
                values={['red_ss',  'blue_ss']}
                className={'text-xl'}
                unSelectedClassName={['text-red-500 bg-gray-300 ', 'text-blue-500 bg-gray-300']}
                selectedClassName={['bg-red-500 text-white', 'bg-blue-500 text-white',]}/>
            
             : pitScouting ? undefined : 

            <MultiButton 
                onChange={onChangeRobotPosition} value={robotPosition} 
                labels={['Red 1', 'Red 2', 'Red 3', 'Blue 1', 'Blue 2', 'Blue 3']}
                values={['red_1',  'red_2', 'red_3', 'blue_1', 'blue_2', 'blue_3']}
                className={'text-xl'}
             
                unSelectedClassName= {['text-red-500 bg-gray-300 ', 'text-red-500 bg-gray-300', 'text-red-500 bg-gray-300', 'text-blue-500 bg-gray-300', 'text-blue-500 bg-gray-300', 'text-blue-500 bg-gray-300'] }
                selectedClassName={['bg-red-500 text-white', 'bg-red-500 text-white', 'bg-red-500 text-white', 'bg-blue-500 text-white',  'bg-blue-500 text-white',  'bg-blue-500 text-white']}/>
    }
            

               <div className={`flex flex-row  col-span-2 justify-self-center ${superScouting ? 'row-start-4' : pitScouting ? 'row-start-3 ': 'row-start-6'} col-start-1 `}>

                <button onClick={handleSubmit} className={` ${showCheck ? 'bg-green-500' : 'bg-gray-300'}  m-3 px-5 bg-gray-300 rounded-md  hover:bg-green-500  justify-center text-xl py-3`}>Submit</button>
                 {/* {showCheck && (   
                    <MaterialSymbol icon="check" size={60} fill grade={200} color='green' />               
                )} */}
        
                
            </div>
            
        </div>
        
    </>
    );
}

export default SignIn;



/* 
state variable - type for alliance already (in packages - robot position)
make state of type robot position
look at endgame button (fill in values, labels, and optionally, classnames)
*/
