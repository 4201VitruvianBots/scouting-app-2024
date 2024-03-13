import LinkButton from './components/LinkButton';

function RootMenu() {
    return (
        <main className='min-h-screen bg-[#171c26] text-white text-center 
        grid grid-cols-2 grid-rows-[auto] auto-rows-fr gap-10 pb-10 px-10 select-none'>
            <h1 className='bg-[#2f3646] col-span-2 text-4xl text-[#48c55c] font-bold p-5'>
                Vitruvian Scouting
            </h1>
            <div className='fixed bottom-2 left-1/2 -translate-x-1/2'> Version {import.meta.env.VITE_SCOUT_VERSION} </div>
                <LinkButton link='/match'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Match
                </LinkButton>
                <LinkButton link='/super'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Super
                </LinkButton>
                <LinkButton link='/pit'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Pit
                </LinkButton>
                <LinkButton link='/recon'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Recon
                </LinkButton>
                <LinkButton link='/picklist'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Picklist
                </LinkButton>
                <LinkButton link='/games'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Games
                </LinkButton>
        </main>
    );
}

export default RootMenu;