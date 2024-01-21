/* eslint-disable react-hooks/rules-of-hooks */

//import { useState } from "react";
import { useEffect, /*useState */} from "react";
// import { postJson } from './util';



function useQueue() {
    
    // const [data, setData] = useState("");
       
        
    // const handleSubmit: any() => {
    //     setData()
    // }
    
        
        useEffect(() => {
            const testInterval = setInterval(()=>{
                console.log('thisistest');
            }, 2000)
            
            return () => {
                clearInterval(testInterval)
            }
            
        }, []);
}


// function Queue() {

//     setInterval(displaySubmit)

    
// };

export {useQueue};