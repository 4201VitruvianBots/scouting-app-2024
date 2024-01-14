import { useState } from 'react';
import { Button, ToggleButton } from '@mui/material';
import fieldRed from '../images/fieldRed.png';
import fieldBlue from '../images/fieldBlue.png';

function FieldButton() {
    const [count, setCount] = useState({ near: 0, mid: 0, far: 0, amp: 0, trap: 0, high: 0,});
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
        <div>
            <ToggleButton
                value='check'
                selected={image === fieldRed}
                onChange={handleImage}
                className='font-serif'>Toggle Map Color
            </ToggleButton>
            <Button variant='outlined' onClick={() => handleCount('near')}>{count.near}</Button>
            <Button variant='outlined' onClick={() => handleCount('mid')}>{count.mid}</Button>
            <Button variant='outlined' onClick={() => handleCount('far')}>{count.far}</Button>
        </div>
    );
}

export default FieldButton;