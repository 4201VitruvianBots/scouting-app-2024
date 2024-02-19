import { MatchDataAggregations } from "requests";
import LinkButton from "../../components/LinkButton";
import { useFetchJson } from "../../lib/useFetchJson";
import { useState } from "react";
import StatRow from "./components/StatRow";


const stats:(Exclude<keyof MatchDataAggregations, '_id'>)[] = [
    'averageTeleSpeakerNotes',
    'averageTeleAmpNotes',
    'averageAutoSpeakerNotes',
    'averageAutoAmpNotes',
    'averageTrapNotes',
    'maxTeleSpeakerNotes',
    'maxTeleAmpNotes',
    'maxAutoSpeakerNotes',
    'maxAutoAmpNotes',
    'maxTrapNotes',
]

function ReconApp() {;
    const retrieve = useFetchJson<MatchDataAggregations[]>('/data/retrieve')
    
    const [teams, setTeams] = useState<number[]>([1609, 7220, 4936, 8627])
    return (
        <>

            <h1>Recon App</h1>
            <LinkButton link='/'>Home</LinkButton>
           
            <table>
                <thead>
                   <tr>
                    
                    </tr>
                </thead>
                <tbody>
                   {stats.map(stat => <StatRow data={retrieve} teams={teams} stat={stat}/>)}
                </tbody>
            </table>
        </>
    );
}

export default ReconApp;
