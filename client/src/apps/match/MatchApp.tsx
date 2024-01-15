{/*This is used for testing. it will be deleted later */}
import {matchApp} from "server/src/Schema";
import { postJson } from "../../util";

function MatchApp() {
    

    {/*This is used for testing. it will be deleted later */}    
    const test = async () => {
        const data = new matchApp({
            metaData:{
                scouterName: "vdsabgh",
                robotTeam: 23
            },
            nonAmpedSpeakerNotes: 121,
            ampedSpeakerNotes: 39,
            ampNotes: 321,
            trapNotes: 45453,
            highNotes: 5443,
            climb: {
            failed: false,
            success: false,
            harmony: true,
            },
            parked: true,
            disabledSeconds: 0
        })
        await postJson('http://localhost:8080/data/match', data);
        console.log(test)
    }
        
    return (
        <>
            <h1>Match App</h1>
            {/* <form method="POST" action="/data/match" /> */}
            {/*This is used for testing. it will be deleted later */}
            <button onClick={test}> test </button>
        </>
    );
 }

export default MatchApp;
