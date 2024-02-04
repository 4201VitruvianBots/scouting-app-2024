import LinkButton from './components/LinkButton';

function RootMenu() {
    return (
        <main className='box-border grid h-screen auto-rows-fr grid-cols-2 grid-rows-[auto] items-stretch gap-5 p-5'>
            <p className='col-span-2 text-center font-mono text-3xl text-green-700'>
                Welcome to Vitruvian Scouting
            </p>
            <LinkButton link='/public'>Public</LinkButton>
            <LinkButton link='/match'>Match</LinkButton>
            <LinkButton link='/super'>Super</LinkButton>
            <LinkButton link='/pit'>Pit</LinkButton>
            <LinkButton link='/recon'>Recon</LinkButton>
        </main>
    );
}

export default RootMenu;