import { MatchDataAggregations } from "requests";
import LinkButton from "../../components/LinkButton";
import { useFetchJson } from "../../lib/useFetch";
import { useState } from "react";
import StatRow from "./components/StatRow";
import { MaterialSymbol } from "react-material-symbols";
import TeamDropdown from "../../components/TeamDropdown";


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
    
    const [teams, setTeams] = useState<(number | undefined)[]>([7199, 7292, 9861, 6213])
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
                    {teams.map((team, index) => <th className="border-4 border-slate-700">
                        <TeamDropdown value={team} onChange={value => setTeams(teams.map((team, index2) => index===index2? value : team))}/>
                        <button onClick={() => setTeams(teams.filter((_, index2) => index!==index2))}>X</button>
                    </th>)}
                    <td><button onClick={() => setTeams([...teams, undefined])}>Add</button></td>
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
