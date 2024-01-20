import { useState } from 'react';
import { styled } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';

function FieldButton() {
    const [count, setCount] = useState({
        near: 0,
        mid: 0,
        far: 0,
        amp: 0,
        trap: 0,
        high: 0,
    });
    const [ampCount, setAmpCount] = useState({ aNear: 0, aMid: 0, aFar: 0 });
    type countKeys = 'near' | 'mid' | 'far' | 'amp' | 'trap' | 'high';
    type ampKeys = 'aNear' | 'aMid' | 'aFar';
    const [allianceBlue, setAllianceBlue] = useState(false); //false=blue, true=red

    // const image = allianceBlue ? fieldBlue : fieldRed;

    const [amplified, setAmplified] = useState(false); //false=off, true=on

    const handleCount = (key: countKeys, aKey?: ampKeys) => {
        if (amplified == true && aKey) {
            setAmpCount(prevCount => ({
                ...prevCount,
                [aKey]: prevCount[aKey] + 1,
            }));
        } else {
            setCount(prevCount => ({
                ...prevCount,
                [key]: prevCount[key] + 1,
            }));
        }
    };

    const handleImage = () => {
        setAllianceBlue(!allianceBlue);
    };

    const handleAmplified = () => {
        setAmplified(!amplified);
    };

    const ToggleButton1 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#3268a8',
        },
    });

    const ToggleButton2 = styled(MuiToggleButton)({
        '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: '#00ff00',
        }, 
    });

    return (
        <>
            <ToggleButton1
                value='check'
                selected={allianceBlue}
                onChange={handleImage}
                className='font-serif bg-red-400'>
                Toggle Map Color
            </ToggleButton1>

            <ToggleButton2
                value='check'
                onChange={handleAmplified}
                selected={amplified}
                className={`${amplified ? 'bg-yellow-300' : 'bg-slate-500'} font-serif`}>
                Amp {amplified ? 'On' : 'Off'}
                {/* {amplified ? <>Amp <span>On</span></> : 'Amp Off'} */}
            </ToggleButton2>
            <div
                className={`${allianceBlue ? 'bg-field-blue' : 'bg-field-red'} align-center flex h-[40em] w-[40em] flex-row bg-cover bg-center object-contain brightness-75`}>
                {allianceBlue ? (
                    <>
                        <button
                            className='h-full w-1/3 overflow-hidden bg-orange-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('near', 'aNear')}
                            id='one'>
                            <p>{count.near}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aNear}
                            </p>
                        </button>

                        <button
                            className='h-full w-1/3 overflow-hidden bg-blue-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('mid', 'aMid')}
                            id='one'>
                            <p>{count.mid}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aMid}
                            </p>
                        </button>

                        <button
                            className='h-full w-1/3 overflow-hidden bg-green-600 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('far', 'aFar')}
                            id='one'>
                            <p>{count.far}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aFar}
                            </p>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className='h-full w-1/3 bg-green-600 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('far', 'aFar')}
                            id='one'>
                            <p>{count.far}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aFar}
                            </p>
                        </button>

                        <button
                            className='h-full w-1/3 bg-blue-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('mid', 'aMid')}
                            id='one'>
                            <p>{count.mid}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aMid}
                            </p>
                        </button>

                        <button
                            className='h-full w-1/3 bg-orange-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                            onClick={() => handleCount('near', 'aNear')}
                            id='one'>
                            <p>{count.near}</p>
                            <p className='m-[10px] text-[20px]'>
                                AMP: {ampCount.aNear}
                            </p>
                        </button>
                    </>
                )}

                <br />
            </div>
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('amp')}>
                {' '}
                AMP Note: {count.amp}{' '}
            </button>
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('high')}>
                {' '}
                High Note: {count.high}{' '}
            </button>
            <button
                className='border-1 h-24 w-48 rounded-lg border border-gray-700 px-4 shadow-xl'
                onClick={() => handleCount('trap')}>
                {' '}
                Trap Note: {count.trap}{' '}
            </button>
        </>
    );
}

export default FieldButton;
