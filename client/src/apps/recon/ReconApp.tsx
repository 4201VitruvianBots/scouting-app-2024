import { MatchDataAggregations } from "requests";
import LinkButton from "../../components/LinkButton";
import { useFetchJson } from "../../lib/useFetch";
import { useState } from "react";
import StatRow from "./components/StatRow";
import { MaterialSymbol } from "react-material-symbols";


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
    const [retrieve] = useFetchJson<MatchDataAggregations[]>('/data/retrieve')
    
    const [teams, setTeams] = useState<number[]>([7199, 7292, 9861, 6213])
    return (
        <main className='mx-auto flex grid-flow-row flex-col content-center  items-center justify-center'>
            <h1 className='my-8 text-center text-3xl'>Recon Interface</h1>

            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md p-2'>
            <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={60}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
            </LinkButton>
            </div>
           
            <table className="border-4 border-slate-700">
                <thead>
                   <tr>
                    <td className="border-4 border-slate-700">Team</td>
                    {teams.map(teams => <th className="border-4 border-slate-700" key={teams}>{teams}</th>)}
                    </tr>
                </thead>
                <tbody>
                   {stats.map(stat => <StatRow data={retrieve} teams={teams} stat={stat}/>)}
                </tbody>
            </table>
        </main>
    );
}

export default ReconApp;
