// Using this file to re-write other files and clean em up
import { useState } from 'react';
import { Button, ButtonGroup, ToggleButton } from '@mui/material';
//import fieldRed from '../images/fieldRed.png';
//import fieldBlue from '../images/fieldBlue.png';

function FieldButton() {
    type countKeys = 'near' | 'mid' | 'far' | 'amp' | 'trap' | 'high';
    const [count, setCount] = useState({near: 0, mid: 0, far: 0, amp: 0, trap: 0, high: 0});
    const [countHistory, setCountHistory] = useState<{key: countKeys, oldValue: number, newValue: number}[]>([]);
    const [alliance, setAlliance] = useState(false); //false=blue, true=red
    //const image = alliance ? fieldBlue : fieldRed; //sets image to Blue/Red depending on alliance

    const handleCount = (key: countKeys) => {
        setCount(prevCount => {
            const newCount = {...prevCount, [key]: prevCount[key] + 1};
            setCountHistory(prevHistory => [{key, oldValue: prevCount[key], newValue: newCount[key]}, ...prevHistory]);
            return newCount;
        });
    };
    const undoCount = () => {
        if (countHistory.length > 0) {
            setCount(prevCount => {
                const lastCount = countHistory[0];
                const newCount = {...prevCount, [lastCount.key]: lastCount.oldValue};
                setCountHistory(prevHistory => prevHistory.slice(1));
                return newCount;
            });
        }
    };
    const handleImage = () => {
        setAlliance(!alliance)
    };

    return(
        <div>
            <ToggleButton value='check' onClick={handleImage}>Switch Alliance</ToggleButton>
            <Button onClick={undoCount}>Undo Count</Button>
            <div>
                {/* <img src={image} /> */}
                <ButtonGroup className=''>
                    <Button onClick={() => handleCount('near')}>{count.near}</Button>
                    <Button onClick={() => handleCount('mid')}>{count.mid}</Button>
                    <Button onClick={() => handleCount('far')}>{count.far}</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default FieldButton