import LinkButton from './components/LinkButton';

function RootMenu() {
    return (
        <main className='min-h-screen bg-[#171c26] text-white text-center 
        grid grid-cols-2 grid-rows-[auto] auto-rows-fr gap-10 pb-10 px-10 select-none'>
            <h1 className='bg-[#2f3646] col-span-2 text-4xl text-green-700 font-bold p-5'>
                Vitruvian Scouting
            </h1>
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
                <LinkButton link='/public'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Public
                </LinkButton>
                <LinkButton link='/'
                className='text-5xl bg-[#2f3646] rounded-3xl'>
                    Games
                </LinkButton>
        </main>
    );
}

export default RootMenu;