import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function LinkButton({
    link,
    icon,
    className,
    children,
}: {
    link: string;
    icon?: ReactNode;
    className?: string;
    children?: string;
}) {
    return (
        <>
            <Link to={link} className={className}>
                <Button
                    variant='outlined'
                    color='success'
                    style={{ width: '100%', height: '100%', fontSize: '30px', backgroundColor:'lightgray', borderColor:'darkgray'}}
                    startIcon={icon}>
                    {children}
                </Button>
            </Link>
        </>
    );
}

export default LinkButton;

// Christian's Funny Buttons vvv
// const foilage = new Audio("/src/audio/vine-boom.mp3")

// const trum = new Audio("/src/audio/trumpet.mp3")

// const poo = () => {
//     foilage.play()
// }

// const po = () => {
//     trum.play()
// }

{
    /* <main>
    <button className='text-red-800 text-2xl font-black cursor-not-allowed underline' onClick={poo}><Link to='/match'>VINE BOOM</Link></button>
    <button className='text-green-700 text-2xl font-serif cursor-wait underline' onClick={po}><Link to='/super'>Trumpet!</Link></button> */
}
