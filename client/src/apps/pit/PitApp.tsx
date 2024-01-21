import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function PitApp() {
    return (
        <>
            <h1>Pit App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
        </>
    );
}

export default PitApp;
