
import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import { postJson } from '../../util';
import { MatchData } from 'server/requests';

function MatchApp() {
    {
        /*This is used for testing. it will be deleted later */
    }
    const test = async () => {
        const data: MatchData = {
            metadata: {
                scouterName: 'bhhjb',
                robotTeam: 23,
                robotPosition: 'red_2',
            },
            nonAmpedSpeakerNotes: 121,
            ampedSpeakerNotes: 39,
            ampNotes: 321,
            trapNotes: 45453,
            highNotes: 5443,
            climb: 'success',
            parked: true,
            disabledSeconds: 0,
        };
        await postJson('/data/match', data);
        console.log(test);
    };

    return (
        <>
            <h1>Match App</h1>

            <BackHome
                    link='/'
                    icon={
                        <HomeIcon style={{ fontSize: '30px' }} />
                    }>
                  
            </BackHome>

            {/*This is used for testing. it will be deleted later */}
            <button onClick={test}> submit </button>

        </>
    );
}

export default MatchApp;
