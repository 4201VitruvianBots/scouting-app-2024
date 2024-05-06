import LinkButton from './components/LinkButton';

import { MaterialSymbol } from 'react-material-symbols';

const images = [
    'bg-field-blue',
    'bg-field-red',
    'bg-field-red-endgame',
    'bg-field-blue-endgame',
    'bg-field-blue-super',
    'bg-field-red-super',
];

function RootMenu() {
    return (
        <main
            className='grid min-h-screen select-none auto-rows-fr 
        grid-cols-2 grid-rows-[auto] gap-10 bg-[#171c26] px-10 pb-10 text-center text-white'>
            <h1 className='col-span-2 bg-[#2f3646] p-5 text-4xl font-bold text-[#48c55c]'>
                Vitruvian Scouting
            </h1>
            <div className='fixed bottom-2 left-1/2 -translate-x-1/2'>
                {' '}
                Version {import.meta.env.VITE_SCOUT_VERSION}{' '}
            </div>
            <LinkButton
                link='/match'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Match
            </LinkButton>
            <LinkButton
                link='/super'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Super
            </LinkButton>
            <LinkButton
                link='/pit'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Pit
            </LinkButton>
            <LinkButton
                link='/recon'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Recon
            </LinkButton>
            <LinkButton
                link='/picklist'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Picklist
            </LinkButton>
            <LinkButton
                link='/games'
                className='rounded-3xl bg-[#2f3646] text-5xl'>
                Games
            </LinkButton>
            <LinkButton
                link='/score_calculator'
                className='col-span-2 rounded-3xl bg-[#2f3646] text-5xl'>
                Scoring Calculator
            </LinkButton>
            <div className='absolute opacity-0'>
                {images.map(e => (
                    <div className={e} />
                ))}
                <MaterialSymbol icon='search' />
            </div>
        </main>
    );
}

export default RootMenu;
