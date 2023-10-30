import { Link } from 'react-router-dom';

function RootMenu() {
    return (
        <main>
            <p>
                <Link to='/admin'>Admin</Link>
            </p>
            <p>
                <Link to='/match'>Match</Link>
            </p>
            <p>
                <Link to='/pit'>Pit</Link>
            </p>
            <p>
                <Link to='/recon'>Recon</Link>
            </p>
            <p>
                <Link to='/super'>Super</Link>
            </p>
        </main>
    );
}

export default RootMenu;
