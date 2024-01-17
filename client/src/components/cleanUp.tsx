// Using this file to re-write other files and clean em up
import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import fieldRed from '../images/fieldRed.png';
import fieldBlue from '../images/fieldBlue.png';

function Test() {
    type countKeys = 'near' | 'mid' | 'far' | 'amp' | 'trap' | 'high'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [count, setCount] = useState({near: 0, mid: 0, far: 0, amp: 0, trap: 0, high: 0});
    const [alliance, setAlliance] = useState(false); //false=blue, true=red
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const image = alliance ? fieldBlue : fieldRed //sets image to Blue/Red depending on alliance

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCount = (key: countKeys, operation: 'add' | 'subtract') => {
        setCount(prevCount => ({
            ...prevCount,
            [key]: prevCount[key] + (operation === 'add' ? 1 : -1)
        }))
    };
    const handleImage = () => {
        setAlliance(!alliance)
    };

    return(
        <div>
            <ToggleButton value='check' onClick={handleImage}>Switch Alliance</ToggleButton>
            <div className='' style={{backgroundImage: `url(${image})`}}>
                <p>content</p>
            </div>
        </div>
    );
}

export default Test