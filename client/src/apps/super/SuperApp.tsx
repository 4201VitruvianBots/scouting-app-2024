import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useState } from 'react';
import Dialog from '../../components/Dialog';
import { Foul, SuperPosition, Break, StageLocation } from 'requests';
import SuperTeam from './components/SuperTeam';
import { SuperTeamState } from './components/SuperTeam';
import MultiSelectFieldButton from '../../components/MultiSelectFieldButton';

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
};

function SuperApp() {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    const [team1, setTeam1] = useState(defaultSuperTeamState);
    const [team2, setTeam2] = useState(defaultSuperTeamState);
    const [team3, setTeam3] = useState(defaultSuperTeamState);

    const [highNotes, setHighNotes] = useState<Record<StageLocation, boolean>>({
        amp: false,
        center: false,
        source: false,
    });

    return (
        <main className='text-center'>
            <h1 className='col-span-3 my-8 text-3xl'>Super Scouting App</h1>
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
                            onSubmit={close}
                            superScouting
                        />
                    )}
                </Dialog>
            </div>

            <div className='grid grid-cols-3 px-10'>
                <SuperTeam teamState={team1} setTeamState={setTeam1} />
                <SuperTeam teamState={team2} setTeamState={setTeam2} />
                <SuperTeam teamState={team3} setTeamState={setTeam3} />
            </div>

            <MultiSelectFieldButton
                highNotes={highNotes}
                setHighNotes={setHighNotes}
                alliance={superPosition === 'blue_ss'}
                className='relative mx-auto  my-5 h-[40em] w-[40em] justify-items-center bg-cover bg-center '
            />
        </main>
    );
}

export default SuperApp;
