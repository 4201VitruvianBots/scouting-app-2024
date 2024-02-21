import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useState } from 'react';
import Dialog from '../../components/Dialog';
import ButtonDropdown from '../../components/ButtonDropdown';
import { Foul, DefenseRank, SuperPosition, StageLocation } from 'requests';
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

export interface TeamStates {
    foulCounts: Record<string, number>;
    breakCount: number;
    defenseRank: DefenseRank;
    wasDefended: boolean;
}
interface ParentComponentProps {
    options: string[];
}

function SuperApp({ options }: ParentComponentProps) {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    
    const [teamOne, setTeamOne] = useState<TeamStates>({
        foulCounts: options
            ? options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {})
            : {},
        breakCount: 0,
        defenseRank: 'No Defense',
        wasDefended: false,
    });
    const [teamTwo, setTeamTwo] = useState<TeamStates>({
        foulCounts: options
            ? options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {})
            : {},
        breakCount: 0,
        defenseRank: 'No Defense',
        wasDefended: false,
    });
    const [teamThree, setTeamThree] = useState<TeamStates>({
        foulCounts: options
            ? options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {})
            : {},
        breakCount: 0,
        defenseRank: 'No Defense',
        wasDefended: false,
    });

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
        <ButtonDropdown
                options={foulTypes}
                teamStates={teamOne}
                setTeamStates={setTeamOne}>
                Add Foul
            </ButtonDropdown>
            <ButtonDropdown
                options={foulTypes}
                teamStates={teamTwo}
                setTeamStates={setTeamTwo}>
                Add Foul
            </ButtonDropdown>
            <ButtonDropdown
                options={foulTypes}
                teamStates={teamThree}
                setTeamStates={setTeamThree}>
                Add Foul
            </ButtonDropdown>

        </div>
   

            <MultiSelectFieldButton
                highNotes={highNotes}
                setHighNotes={setHighNotes}
                alliance={(superPosition === 'blue_ss')}
                className='my-5 justify-items-center  mx-auto relative h-[40em] w-[40em] bg-cover bg-center '
               
            />
        </main>
    );
}

export default SuperApp;
