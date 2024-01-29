import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function ReconApp() {
    return (
        <>
            <h1>Recon App</h1>
            <BackHome
                link='/'
                icon={<HomeIcon style={{ fontSize: '30px' }} />}></BackHome>
        </>
    );
}

export default ReconApp;
