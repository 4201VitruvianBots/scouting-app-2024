import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

function RootMenu() {
    return (
        <main className='box-border grid h-screen grid-cols-2 items-stretch gap-5 p-5'>
            <Link to={'/match'} className='inline-block'>
                <Button
                    variant='outlined'
                    color='success'
                    style={{ width: '100%', height: '100%', fontSize: '30px' }}
                    startIcon={<ContentPasteSearchIcon style={{fontSize: '50px'}}/>}>    
                    Match
                </Button>
            </Link>
            <Link to={'/super'} className='inline-block'>
                <Button
                    variant='outlined'
                    color='success'
                    style={{ width: '100%', height: '100%', fontSize: '30px' }}
                    startIcon={<ScreenSearchDesktopIcon style={{fontSize: '50px'}}/>}>
                    Super
                </Button>
            </Link>
        </main>
    );
}

export default RootMenu;


// Christian's Funny Buttons vvv
    // const foilage = new Audio("/src/audio/vine-boom.mp3")

    // const trum = new Audio("/src/audio/trumpet.mp3")

    // const poo = () => {
    //     foilage.play()
    // }

    // const po = () => {
    //     trum.play()
    // }

    {/* <main>
    <button className='text-red-800 text-2xl font-black cursor-not-allowed underline' onClick={poo}><Link to='/match'>VINE BOOM</Link></button>
    <button className='text-green-700 text-2xl font-serif cursor-wait underline' onClick={po}><Link to='/super'>Trumpet!</Link></button> */}