import LinkButton from './components/LinkButton';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

import React, { useState } from 'react';
import Signup from './components/Signup';


    



function RootMenu() {
    
    const [showPopup, setShowPopup] = useState(true);
    


    return (
    
        
        <div>
        <Signup></Signup>
        <main className='box-border grid h-screen grid-cols-2 items-stretch gap-5 p-5'>
            <LinkButton
                link='/match'
                icon={<ContentPasteSearchIcon style={{ fontSize: '50px' }} />}>
                Match
            </LinkButton>
            <LinkButton
                link='/super'
                icon={<ScreenSearchDesktopIcon style={{ fontSize: '50px' }} />}>
                Super
            </LinkButton>
        </main>
        </div>
    );
}

export default RootMenu;
