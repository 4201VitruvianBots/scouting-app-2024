import { MatchDataAggregations, MatchSchedule } from "requests";
import LinkButton from "../../components/LinkButton";
import { useFetchJson } from "../../lib/useFetch";
import { useEffect, useState } from "react";
import StatRow from "./components/StatRow";
import { MaterialSymbol } from "react-material-symbols";
import TeamDropdown from "../../components/TeamDropdown";
import NumberInput from "../../components/NumberInput";


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
    const [retrieve, reloadRetrieve] = useFetchJson<MatchDataAggregations[]>('/data/retrieve')
    const [schedule] = useFetchJson<MatchSchedule>('/matchSchedule.json');
    const [matchNumber, setMatchNumber] = useState<number>()
    const [teams, setTeams] = useState<(number | undefined)[]>([undefined])

    useEffect(() => {
        if (!matchNumber) return
        const match = schedule?.[matchNumber];
        if (!match) return
        setTeams([match.red_1, match.red_2, match.red_3, match.blue_1, match.blue_2, match.blue_3])
    },[matchNumber, schedule])

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
           <NumberInput className='rounded-lg border-2 border-slate-900 text-center text-2xl' placeholder="type match #" value={matchNumber} onChange={setMatchNumber}></NumberInput>
           <button className='rounded-lg border-2 border-slate-900 text-lg' onClick={reloadRetrieve}>Reload Data</button>
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
