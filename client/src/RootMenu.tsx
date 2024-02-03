import LinkButton from './components/LinkButton';

function RootMenu() {
    return (
        <main>
            <p>Welcome to Vitruvian Scouting</p>

            <LinkButton link='/public'>Public</LinkButton>
            <LinkButton link='/match'>Match</LinkButton>
            <LinkButton link='/super'>Super</LinkButton>
            <LinkButton link='/pit'>Pit</LinkButton>
            <LinkButton link='/recon'>Recon</LinkButton>
        </main>
    );
}

export default RootMenu;