import fieldmapRED from '../../images/fieldmapRED.png';
import fieldmapBLUE from '../../images/fieldmapBLUE.png';
import { ToggleButton } from '@mui/material';
import { useState } from 'react';

function MatchApp() {
    const [currentImage, setCurrentImage] = useState(fieldmapRED);
    const handleToggle = () => {
        setCurrentImage(
            currentImage === fieldmapRED ? fieldmapBLUE : fieldmapRED
        );
    };

    return (
        <>
            <p>Match Scouting App</p>

            <ToggleButton
                value='check'
                selected={currentImage === fieldmapRED}
                onChange={handleToggle}>
                Toggle Map Color
            </ToggleButton>
            <img src={currentImage} />
        </>
    );
}

export default MatchApp;
