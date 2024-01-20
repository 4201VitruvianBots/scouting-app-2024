import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function SuperApp() {
    return (
        <>
            <h1>Super Scouting App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
        </>
    );
}

export default SuperApp;
