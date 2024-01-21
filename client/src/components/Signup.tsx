import { SetStateAction, useState } from 'react';



// "savedValue" is where the signin user is saved
function Signup() {
    
    const [showPopup, setShowPopup] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [savedValue, setSavedValue] = useState('');

    const handleChange = (event) => {
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
         <div className='opacity-75' style={{backgroundColor: 'lightgrey', padding: '20px', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 2}}>
          <div className="rounded-xl border-green-900 border-8 text-5xl opacity-90" style={{backgroundColor: 'grey', padding: '20px', position: 'fixed', top: 150, bottom: 150, left: 150, right: 150, zIndex: 1}}>
            Sign In with your name please :D
            
            <br></br>
            <br></br>
            <br></br>
            
            <div className="flex justify-center items-center">
            <input className='border-1 rounded-lg border border-gray-700 text-5xl' type="text" value={inputValue} onChange={handleChange}></input>
            </div>
            <br></br>
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