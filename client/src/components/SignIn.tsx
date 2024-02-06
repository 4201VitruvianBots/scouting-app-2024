import { useState } from "react";
import { RobotPosition } from "requests";
import MultiButton from "./MultiButton";
import { MaterialSymbol } from 'react-material-symbols';

function SignIn(){
    const [allianceColor, setAllianceColor] = useState<RobotPosition>()
    const [showCheck, setShowCheck] = useState<boolean>(false);

    function handleSubmit(){

        setShowCheck(true)
        // setTimeout(() => { setShowCheck(false) }, 5000);

        


    }
  
    return (
    <>
        < div className="w-[400px] h-[400px] box-border grid-cols-2 grid auto-rows-fr grid-rows-[auto] gap-3 justify-center ">
            <p className='text-green-600 col-span-2 justify-self-center'>Sign-In</p>
            <input type="text" className=" text-black col-span-2 outline-double h-[40px] text-xl outline-sky-300 required justify-center" placeholder="Name"></input>
            
            <MultiButton 
                onChange={setAllianceColor} value={allianceColor} 
                labels={['Red 1', 'Blue 1', 'Red 2', 'Blue 2', 'Red 3', 'Blue 3']}
                values={['red_1', 'blue_1', 'red_2', 'blue_2', 'red_3', 'blue_3']}
                className={'text-xl'}
                unSelectedClassName= {['text-red-500 bg-gray-300 ', 'text-blue-500 bg-gray-300', 'text-red-500 bg-gray-300', 'text-blue-500 bg-gray-300','text-red-500 bg-gray-300', 'text-blue-500 bg-gray-300'] }
                selectedClassName={['bg-red-500 text-white', 'bg-blue-500 text-white', 'bg-red-500 text-white', 'bg-blue-500 text-white', 'bg-red-500 text-white', 'bg-blue-500 text-white']}/>
               
               <div className="flex flex-row  col-span-2 justify-self-center">

                 <button onClick={handleSubmit} className={` ${showCheck ? 'bg-green-500' : 'bg-gray-300'}  m-3 px-5 bg-gray-300 rounded-md  hover:bg-green-500  justify-center text-xl`}>Submit</button>
                 {showCheck && (   
                    <MaterialSymbol icon="check" size={60} fill grade={200} color='green' />               
                )}
        
                
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
