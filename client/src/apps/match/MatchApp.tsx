import fieldmapRED from '../../images/fieldmapRED.png';
import fieldmapBLUE from '../../images/fieldmapBLUE.png';
import { ToggleButton } from '@mui/material';
import { useState } from 'react';

function MatchApp() {
    const [isBlueAlliance, setIsBlueAlliance] = useState(false);
    const currentImage = isBlueAlliance ? fieldmapBLUE : fieldmapRED; //use this boolean whenever switching from red/blue is needed
    const [counterNear, setCounterNear] = useState(0);
    const [counterMid, setCounterMid] = useState(0);
    const [counterFar, setCounterFar] = useState(0);

    const handleToggle = () => {
        setIsBlueAlliance(!isBlueAlliance);
    };

    function addOneNear(){
        setCounterNear(counterNear + 1);
    };
    function addOneMid(){
        setCounterMid(counterMid + 1);
    };
    function addOneFar(){
        setCounterFar(counterFar + 1);
    };


    return (
        <>
            <p>Match Scouting App</p>

            <ToggleButton
                value='check'
                selected={currentImage === fieldmapRED}
                onChange={handleToggle}
                className='font-serif'>
                Toggle Map Color
            </ToggleButton>

            {/* <div style={{ backgroundImage: `url(${currentImage})` }}> */}
                <div
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '40em',
                        width: '40em',
                        objectFit: 'contain',
                        filter: 'brightness(80%)',
                        alignSelf:'center'
                        
                    }}>
                      
                       <button className='bg-orange-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans'  onClick={addOneNear} id='one'>{counterNear}</button>
                       <button className='bg-blue-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans' onClick={addOneMid} id='one'>{counterMid}</button>
                       <button className='bg-green-500 w-1/3 h-full md:bg-opacity-50 font-semibold  text-white text-6xl font-sans' onClick={addOneFar} id='one'>{counterFar}</button>
                      
                    </div>
                < p>hello {isBlueAlliance ? 'world' : 'natalie'}</p>

            
            {/* <img src={currentImage} className='background-image' /> */}
            <p>Alliance: {isBlueAlliance ? 'Blue' : 'Red'}</p>
        </>
    );
}

export default MatchApp;
