 {/*This is used for testing. it will be deleted later */}
import {MatchData} from "server/requests";
import { postJson } from "../../util";

function MatchApp() {
    

    {/*This is used for testing. it will be deleted later */}    
    const test = async () => {
        const data: MatchData = {
            metadata: {
                scouterName: 'Kyle Sue Baki',
                robotPosition: 'blue_1',
                robotTeam: 4201,
            },
            ampedSpeakerNotes: 100000,
            ampNotes: 2,
            climb: "harmony",
            disabledSeconds: 5,
            highNotes: 252,
            nonAmpedSpeakerNotes: 1,
            parked: true,
            scoringLocations: {
                A: 10,
                B: 10,
            },
            trapNotes: 5
        }

        await postJson('/data/match', data);

    };

    return (
        <>
            <h1>Match App</h1>

            {/*This is used for testing. it will be deleted later */}
            <button onClick={test}> test </button>
        </>
    );
}

export default MatchApp;
