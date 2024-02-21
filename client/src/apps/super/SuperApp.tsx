import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useState } from 'react';
import Dialog from '../../components/Dialog';
import { Foul, SuperPosition, Break, DefenseRank } from 'requests';
import SuperTeam from './components/SuperTeam';
import { SuperTeamState } from './components/SuperTeam';
import Checkbox from '../../components/Checkbox';

const foulTypes: Foul[] = [
    'inBot',
    'damageBot',
    'overExtChute',
    'pinBot',
    'podiumFoul',
    'stageFoul',
    'tipEntangBot',
    'zoneFoul'
];
const breakTypes: Break[] = [
    'mechanismDmg',
    'batteryFall',
    'commsFail'
];

const defaultSuperTeamState: SuperTeamState = {
    foulCounts: Object.fromEntries(foulTypes.map(e => [e, 0])) as Record<
        Foul,
        number
    >,
    breakCount: Object.fromEntries(breakTypes.map(e => [e, 0])) as Record<
    Break, number
    >,
};

function SuperApp() {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    const [defenseRank1, setDefenseRank1] = useState<DefenseRank>('noDef');
    const [defenseRank2, setDefenseRank2] = useState<DefenseRank>('noDef');
    const [defenseRank3, setDefenseRank3] = useState<DefenseRank>('noDef');
    const [defended1, setDefended1] = useState(false);
    const [defended2, setDefended2] = useState(false);
    const [defended3, setDefended3] = useState(false);
    const [team1, setTeam1] = useState(defaultSuperTeamState);
    const [team2, setTeam2] = useState(defaultSuperTeamState);
    const [team3, setTeam3] = useState(defaultSuperTeamState);

    const handleDefended1 = () => {
        setDefended1(!defended1)
    }
    const handleDefended2 = () => {
        setDefended2(!defended2)
    }
    const handleDefended3 = () => {
        setDefended3(!defended3)
    }

    return (
        <main className='grid columns-3 text-center'>
            <h1 className='col-span-3 my-8 text-3xl'>Super Scouting App</h1>
            <div className='fixed left-4 top-4 z-20 flex gap-2 rounded-md p-2'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={80}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>
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
            <SuperTeam teamState={team1} setTeamState={setTeam1} defenseRank={defenseRank1} setDefense={setDefenseRank1}/>
            <SuperTeam teamState={team2} setTeamState={setTeam2} defenseRank={defenseRank2} setDefense={setDefenseRank2}/>
            <SuperTeam teamState={team3} setTeamState={setTeam3} defenseRank={defenseRank3} setDefense={setDefenseRank3}/>
            <Checkbox onChange={handleDefended1}>Was Defended?</Checkbox>
            <Checkbox onChange={handleDefended2}>Was Defended?</Checkbox>
            <Checkbox onChange={handleDefended3}>Was Defended?</Checkbox>
        </main>
        /* <h1 className='col-span-4 my-8 text-3xl'>Super Scouting App</h1>
            <div className='fixed left-4 top-4 z-20 flex gap-2 rounded-md p-2'>
                <LinkButton link='/' className='snap-none'>
                    <MaterialSymbol
                        icon='home'
                        size={80}
                        fill
                        grade={200}
                        color='green'
                        className='snap-none'
                    />
                </LinkButton>
            </div>
            <Dialog
                    trigger={open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${scouterName && superPosition ? 'text-green-400' 
                                : 'text-gray-400'} snap-none`}
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
            
            <div className='bg-red-200 grid grid-cols-3 grid-rows-auto gap-10 px-10 p-5'>
                <div className='bg-orange-300'>
                    <p>team 1</p>
                    <ButtonDropdown options={foulTypes}>Add Foul</ButtonDropdown>
                </div>
                <div className='bg-yellow-300'>
                    <p>team 2</p>
                </div>
                <div className='bg-green-300'>
                    <p>team 3</p>
                </div>
            </div>
             */
    );
}

export default SuperApp;
