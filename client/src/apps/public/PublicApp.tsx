import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function PublicApp() {
    return (
        <>
            <h1>Public App</h1>
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            
        </>
    );
}

export default PublicApp;