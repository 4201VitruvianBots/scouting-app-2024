import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function MatchApp() {
    return (
        <>
            <h1>Match App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
        </>
    );
}

export default MatchApp;
