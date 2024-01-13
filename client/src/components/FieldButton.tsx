import fieldmapRED from '../images/fieldmapRED.png';
import fieldmapBLUE from '../images/fieldmapBLUE.png';
import { ToggleButton } from '@mui/material';
import { useState } from 'react';

function FieldButton() {
    const [isBlueAlliance, setIsBlueAlliance] = useState(false);
    const currentImage = isBlueAlliance ? fieldmapBLUE : fieldmapRED; //use this boolean whenever switching from red/blue is needed
    const [counterNear, setCounterNear] = useState(0);
    const [counterMid, setCounterMid] = useState(0);
    const [counterFar, setCounterFar] = useState(0);
    const [AMP, setAMP] = useState(0);
    const handleToggle = () => {
        setIsBlueAlliance(!isBlueAlliance);
    };

    function addOneNear() {
        setCounterNear(counterNear + 1);
    }
    function addOneMid() {
        setCounterMid(counterMid + 1);
    }
    function addOneFar() {
        setCounterFar(counterFar + 1);
    }
    function addOneAMP() {
        setAMP(AMP + 1);
    }

    return (
        <>
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
                    alignSelf: 'center',
                }}>
                <button
                    className='h-full w-1/3 bg-orange-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                    onClick={addOneNear}
                    id='one'>
                    {counterNear}
                </button>
                <button
                    className='h-full w-1/3 bg-blue-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                    onClick={addOneMid}
                    id='one'>
                    {counterMid}
                </button>
                <button
                    className='h-full w-1/3 bg-green-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                    onClick={addOneFar}
                    id='one'>
                    {counterFar}
                </button>
                <button className='' onClick={addOneAMP} id='one'>
                    {AMP}
                </button>
            </div>
            <p>hello {isBlueAlliance ? 'world' : 'natalie'}</p>

            {/* <img src={currentImage} className='background-image' /> */}
            <p>Alliance: {isBlueAlliance ? 'Blue' : 'Red'}</p>
        </>
    );
}

export default FieldButton;
