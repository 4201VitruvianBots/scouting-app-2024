import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useEffect, useState } from 'react';
import Dialog from '../../components/Dialog';
import { Foul, SuperPosition, Break, MatchSchedule, SuperData, HighNote, RobotPosition } from 'requests';
import SuperTeam from './components/SuperTeam';
import { SuperTeamState } from './components/SuperTeam';
import MultiSelectFieldButton from '../../components/MultiSelectFieldButton';
import { useFetchJson } from '../../lib/useFetch';
import NumberInput from '../../components/NumberInput';
import { postJson } from '../../lib/postJson';
import MultiButton from '../../components/MultiButton';
import { useStatus } from '../../lib/useStatus';

const foulTypes: Foul[] = [
    'inBot',
    'damageBot',
    'overExtChute',
    'pinBot',
    'podiumFoul',
    'stageFoul',
    'tipEntangBot',
    'zoneFoul',
];

const defaultHighNote: HighNote = {
    amp: false,
    center: false,
    source: false,
}
const breakTypes: Break[] = ['mechanismDmg', 'batteryFall', 'commsFail'];

const defaultSuperTeamState: SuperTeamState = {
    foulCounts: Object.fromEntries(foulTypes.map(e => [e, 0])) as Record<
        Foul,
        number
    >,
    breakCount: Object.fromEntries(breakTypes.map(e => [e, 0])) as Record<
        Break,
        number
    >,
    defenseRank: 'noDef',
    wasDefended: false,
    teamNumber: undefined,
};


function SuperApp() {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    const [team1, setTeam1] = useState(defaultSuperTeamState);
    const [team2, setTeam2] = useState(defaultSuperTeamState);
    const [team3, setTeam3] = useState(defaultSuperTeamState);

    const [schedule] = useFetchJson<MatchSchedule>('/matchSchedule.json');

    const [shooterPlayerTeam, setShooterPlayerTeam] = useState<number>();
    const [matchNumber, setMatchNumber] = useState<number>(); 
    const [showCheck, setShowCheck] = useState(false);
    const [highNotes, setHighNotes] = useState(defaultHighNote);
    
    useStatus(superPosition, matchNumber, scouterName);
    

    const handleSubmit = async () => {
        if (
            scouterName === undefined ||
            superPosition === undefined ||
            matchNumber === undefined ||
            team1.teamNumber === undefined ||
            team2.teamNumber === undefined || 
            team3.teamNumber === undefined
        ){
            alert('data is missing! :(')
            return; }

        const data = [team1, team2, team3].map((team, index) => 
        ({
            metadata: {
                scouterName,
                matchNumber,
                robotTeam:team.teamNumber!,
                robotPosition: ((superPosition === 'blue_ss' ? ['blue_1', 'blue_2', 'blue_3'] : ['red_1', 'red_2', 'red_3']) satisfies RobotPosition[])[index]
            },
            fouls: team.foulCounts,
            defense: team.defenseRank,
            defended: team.wasDefended,
            humanShooter: shooterPlayerTeam === team.teamNumber ? {
                highNotes
            } : undefined
            
        } satisfies SuperData
        ));

        try {
            const results = await Promise.all(data.map(e => postJson('/data/super', e)));
            if (!results.every(e => e.ok)) throw new Error('Request Did Not Succeed');
            setHighNotes(defaultHighNote);
            setTeam1(defaultSuperTeamState);
            setTeam2(defaultSuperTeamState);
            setTeam3(defaultSuperTeamState);
        } catch {
            alert('Sending Data Failed');
        }

        setShowCheck(true);
    };

    useEffect(() => {
        if (!schedule || !superPosition || !matchNumber) {
            setTeam1(team1 => ({...team1, teamNumber: undefined}));
            setTeam2(team2 => ({...team2, teamNumber: undefined}));
            setTeam3(team3 => ({...team3, teamNumber: undefined}));
            return;
        }
        const blueAlliance = superPosition === 'blue_ss';
        setTeam1(team1 => ({...team1, teamNumber: schedule[matchNumber]?.[blueAlliance ? 'blue_1' : 'red_1']}));
        setTeam2(team2 => ({...team2, teamNumber: schedule[matchNumber]?.[blueAlliance ? 'blue_2' : 'red_2']}));
        setTeam3(team3 => ({...team3, teamNumber: schedule[matchNumber]?.[blueAlliance ? 'blue_3' : 'red_3']}));
    }, [matchNumber, superPosition, schedule]);

    return (
        <main className='text-center bg-[#171c26]'>
            <h1 className='col-span-3 text-3xl text-[#48c55c] font-bold p-5'>Super Scouting App</h1>
            <div className='fixed left-4 top-4 z-20  flex flex-col gap-2 rounded-md bg-slate-200 p-2'>
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
                <Dialog
                    open
                    trigger={open => (
                        <button onClick={open} className='col-span-3'>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${
                                    scouterName && superPosition
                                        ? 'text-green-400'
                                        : 'text-gray-400'
                                } snap-none`}
                            />
                        </button>
                    )}>
                    {close => (
                        <SignIn
                        scouterName={scouterName}
                        onChangeScouterName={setScouterName}
                        robotPosition={superPosition}
                        onChangeRobotPosition={setSuperPosition}
                        superScouting

                        onSubmit={close}
                        
                    />
                    )}
                </Dialog>
            </div>
            <p className='text-xl text-white'>Match Number</p>
            <NumberInput onChange={setMatchNumber} value={matchNumber} 
            className='m-2 p-2 text-black text-xl'/>

            <div className='grid justify-items-center grid-cols-3 px-10'>
                <SuperTeam teamState={team1} setTeamState={setTeam1} />
                <SuperTeam teamState={team2} setTeamState={setTeam2} />
                <SuperTeam teamState={team3} setTeamState={setTeam3} />
            </div>
            
            <MultiButton 
                className='outline-black max-w-40 w-full mx-5 mt-10'
                onChange={setShooterPlayerTeam}
                values={[team1.teamNumber ?? -1, team2.teamNumber ?? -2,team3.teamNumber ?? -3]} // ugly hack hehe
                labels={[team1.teamNumber ?? 'Team 1', team2.teamNumber ?? 'Team 2',team3.teamNumber ?? 'Team 3'].map(e => e.toString())}
                value={shooterPlayerTeam}
                selectedClassName = 'bg-[#48c55c]'
                unSelectedClassName = 'bg-white'/>


            <MultiSelectFieldButton
                highNotes={highNotes}
                setHighNotes={setHighNotes}
                alliance={superPosition === 'blue_ss'}
                className='relative mx-auto my-5 h-[40em] w-[40em] justify-items-center bg-cover bg-center '></MultiSelectFieldButton>

            <button
                    onClick={handleSubmit}
                    className='rounded-md bg-blue-500 px-2 py-5 m-5 max-w-80 w-full'>
                    Submit
            </button>
                <div>
                    {showCheck && (
                        <MaterialSymbol
                            icon='check'
                            size={100}
                            fill
                            grade={200}
                            color='green'
                        />
                    )}
                </div>
            

        </main>
    );
}

export default SuperApp;
