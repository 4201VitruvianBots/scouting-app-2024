import { Link } from 'react-router-dom';

function RootMenu() {
    const foilage = new Audio("/src/audio/vine-boom.mp3")

    const trum = new Audio("/src/audio/trumpet.mp3")

    const poo = () => {
        foilage.play()
    }

    const po = () => {
        trum.play()
    }

    return (
        <main>
            <button className='text-red-800 text-2xl font-black cursor-not-allowed underline' onClick={poo}><Link to='/match'>VINE BOOM</Link></button>
            <button className='text-green-700 text-2xl font-serif cursor-wait underline' onClick={po}><Link to='/super'>Trumpet!</Link></button>
        </main>
    );
}



export default RootMenu;
