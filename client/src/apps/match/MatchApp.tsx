import FieldButton from "../../components/FieldButton";
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';

function MatchApp() {
    return (
        <>
            <p>Match Scouting App</p>
            
            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>
            <FieldButton />
        </>
    );
}


export default MatchApp;
