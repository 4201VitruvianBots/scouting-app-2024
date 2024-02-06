import { useState } from "react";
import { RobotPosition } from "requests";
import MultiButton from "./MultiButton";

function SignIn(){
    const [alliance, setAlliance] = useState<RobotPosition>()

    function handleSubmit(){

    }
  
    return (
    <>
        < div className="w-[400px] h-[400px] box-border grid-cols-2 grid auto-rows-fr grid-rows-[auto] items-stretch gap-3 justify-center ">
            <p className='text-red-400'>Scouter Sign-In</p>
            <input type="text" className=" text-black col-span-2 outline-double outline-sky-300 justify-center" placeholder="Name"></input>
            
            <MultiButton 
                onChange={setAlliance} value={alliance} 
                labels={['Red 1',   'Blue 1', 'Red 2', 'Blue 2', 'Red 3', 'Blue 3']}
                values={['red_1',  'blue_1', 'red_2', 'blue_2', 'red_3', 'blue_3']}
                className={'text-xl'}
                unSelectedClassName= {['text-red-500 bg-gray-300 ', 'text-blue-500 bg-gray-300', 'text-red-500 bg-gray-300', 'text-blue-500 bg-gray-300','text-red-500 bg-gray-300', 'text-blue-500 bg-gray-300'] }
                selectedClassName={['bg-red-500 text-white', 'bg-blue-500 text-white', 'bg-red-500 text-white', 'bg-blue-500 text-white', 'bg-red-500 text-white', 'bg-blue-500 text-white']}/>
               
            

            <button onClick={handleSubmit} className='px-10 m-3  bg-gray-300 rounded-md w-max hover:bg-green-600  justify-center text-xl'>Submit</button>
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
