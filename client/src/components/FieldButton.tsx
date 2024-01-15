import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import fieldRed from '../images/fieldRed.png';
import fieldBlue from '../images/fieldBlue.png';

function FieldButton() {
    const [count, setCount] = useState({
        near: 0,
        mid: 0,
        far: 0,
        amp: 0,
        trap: 0,
        high: 0,
    });
    type countKeys = 'near' | 'mid' | 'far' | 'amp' | 'trap' | 'high';
    const [alliance, setAlliance] = useState(false); //false=blue, true=red
    const image = alliance ? fieldBlue : fieldRed;

    const handleCount = (key: countKeys) => {
        setCount(prevCount => ({
            ...prevCount,
            [key]: prevCount[key] + 1,
        }));
    };
    const handleImage = () => {
        setAlliance(!alliance);
    };

    return (
        <>
            <ToggleButton
                value='check'
                selected={image === fieldRed}
                onChange={handleImage}
                className='font-serif'>
                Toggle Map Color
            </ToggleButton>
            <div
                style={{
                    backgroundImage: `url(${image})`,
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
                    onClick={() => handleCount('near')}
                    id='one'>
                    {count.near}
                </button>

                <button
                    className='h-full w-1/3 bg-blue-500 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                    onClick={() => handleCount('mid')}
                    id='one'>
                    {count.mid}
                </button>

                <button
                    className='h-full w-1/3 bg-green-600 font-sans text-6xl  font-semibold text-white md:bg-opacity-50'
                    onClick={() => handleCount('far')}
                    id='one'>
                    {count.far}
                </button>

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