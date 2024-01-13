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
    const [counterTrap, setCounterTrap] = useState(0);
    const [counterHigh, setCounterHigh] = useState(0);

    // const mementos = []
    // const input = document.querySelector('input') //this is the 'easy' way, memory intensive
   
    // const commands = []
    // const input = document.querySelector('input') the not easy way

    const handleToggle = () => {
        setIsBlueAlliance(!isBlueAlliance);
    };

    // function saveMemento() {
    //     mementos.push(input.value)
    // }
    // function undo() {
    //     const lastMemento = mementos.pop()

    //     input.value = lastMemento : input.value
    // }

   //e

    // function saveCommand(e) {
    //     commands.push({
    //       // the action is also saved for implementing redo, which
    //       // is not implemented in this example.
    //       action: { type: 'add', key: e.key, index: input.selectionStart },
    //       inverse: { type: 'remove', index: input.selectionStart }
    //     })
    //   }

    //   function undo() {
    //     let value = //dunno yet? example is for text so 
    //     const lastCommand = commands.pop()
       
    //     if (!lastCommand) return
          
    //     switch (lastCommand.inverse.type) {
    //       case 'remove':
    //         value.splice(lastCommand.inverse.index, 1)
    //         break;      
    //     }
        
    //     input.value = value.join('')
    //   } harder way but more good i think

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
        if (AMP < 10) {
            setAMP(AMP + 1)
        } else if (AMP >= 10) {
            setAMP(10)
        }
    }
    function addOneTrap() {
        if (counterTrap < 3) {
        setCounterTrap(counterTrap + 1);
        } else if (counterTrap >= 3) {
            setCounterTrap(3)
        }
        
    }
    function addOneHigh() {
        if (counterHigh < 3) {
            setCounterHigh(counterHigh + 1);
        } else if (counterHigh >= 3) {
            setCounterHigh(3)
        }

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
                <br />
                <br />
                {/* above over here for text outside of button */}
                <button
                    className='border-1 rounded-lg border border-gray-700 px-4 shadow-xl'
                    onClick={addOneAMP}
                    id='one'>  Amp Note: { /* or inside the button here */}
                    {AMP}
                </button>
                <br />
                <br />
                <button
                    className='border-1 rounded-lg border border-gray-700 px-4 shadow-xl'
                    onClick={addOneTrap}> Trap Note: { /* <br /> or break and over here to have the words above the number */}
                    {counterTrap}
                </button>
                <br />
                <br />
                <button
                    className='border-1 rounded-lg border border-gray-700 px-4 shadow-xl'
                    onClick={addOneHigh}> High Note:
                    {counterHigh}
                </button>
                <br />
                <p>hello {isBlueAlliance ? 'world' : 'natalie'}</p>

                {/* <img src={currentImage} className='background-image' /> */}
                <p>Alliance: {isBlueAlliance ? 'Blue' : 'Red'}</p>
            </div>



        </>
    );
}

export default FieldButton;
