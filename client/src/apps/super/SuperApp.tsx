import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useState } from 'react';
import Dialog from '../../components/Dialog';
import ButtonDropdown from '../../components/ButtonDropdown';
import { Foul, DefenseRank, SuperPosition } from 'requests';
const foulTypes : Foul[] = ['inBot', 'damageBot', 'overExtChute', 'pinBot', 'podiumFoul', 
'stageFoul', 'tipEntangBot', 'zoneFoul']

export interface TeamStates {
    foulCounts: Record<string, number>;
    breakCount: number;
    defenseRank: DefenseRank
    wasDefended: boolean;
}
interface ParentComponentProps {
    options: string[];
}

function SuperApp({options} : ParentComponentProps) {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();
    const [teamOne, setTeamOne] = useState<TeamStates>({foulCounts: options ? options.reduce((acc, option) => ({ ...acc, [option]:  0 }), {}) : {}, 
    breakCount: 0, defenseRank: 'No Defense', wasDefended: false})
    const [teamTwo, setTeamTwo] = useState<TeamStates>({foulCounts: options ? options.reduce((acc, option) => ({ ...acc, [option]:  0 }), {}) : {}, 
    breakCount: 0, defenseRank: 'No Defense', wasDefended: false})
    const [teamThree, setTeamThree] = useState<TeamStates>({foulCounts: options ? options.reduce((acc, option) => ({ ...acc, [option]:  0 }), {}) : {}, 
    breakCount: 0, defenseRank: 'No Defense', wasDefended: false})
    // const [optionCounts, setOptionCounts] = useState<Record<string, number>>(
    //     options ? options.reduce((acc, option) => ({ ...acc, [option]:  0 }), {}) : {}
    // );

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
            <ButtonDropdown options={foulTypes} teamStates={teamOne} setTeamStates={setTeamOne}>
                Add Foul
            </ButtonDropdown>
            <ButtonDropdown options={foulTypes} teamStates={teamTwo} setTeamStates={setTeamTwo}>
                Add Foul
            </ButtonDropdown>
            <ButtonDropdown options={foulTypes} teamStates={teamThree} setTeamStates={setTeamThree}>
                Add Foul
            </ButtonDropdown>
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