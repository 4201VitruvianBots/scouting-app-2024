 {/*This is used for testing. it will be deleted later */}
import {matchApp} from "server/src/Schema";
import { postJson } from "../../util";

function MatchApp() {
    

    {/*This is used for testing. it will be deleted later */}    
    const test = async () => {
        const data = matchApp.create({
            ampNotes: 68
        })

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
