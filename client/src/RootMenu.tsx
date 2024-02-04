import LinkButton from './components/LinkButton';

function RootMenu() {
    return (
        <main className='grid grid-cols-1'>
            <div className='bg-white shadow-md w-screen z-40 fixed'>
                <h1 
                className='text-5xl font-bold text-green-700 p-5'>
                    Vitruvian Scouting
                </h1>
            </div>
            <div className='grid grid-cols-1 gap-28 py-56 snap-y'>
                <LinkButton link='/match'
                className='text-8xl px-5 py-3 snap-center shadow-md text-left'>
                    Match
                </LinkButton>
                <LinkButton link='/super'
                className='text-8xl px-5 py-3 snap-center shadow-md text-left'>
                    Super
                </LinkButton>
                <LinkButton link='/pit'
                className='text-8xl px-5 py-3 snap-center shadow-md text-left'>
                    Pit
                </LinkButton>
                <LinkButton link='/recon'
                className='text-8xl px-5 py-3 snap-center shadow-md text-left'>
                    Recon
                </LinkButton>
                <LinkButton link='/public'
                className='text-8xl px-5 py-3 snap-center shadow-md text-left'>
                    Public
                </LinkButton>
            </div>
        </main>
    );
}

export default RootMenu;