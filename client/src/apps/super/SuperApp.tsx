import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import { useState } from 'react';
import { SuperPosition } from 'requests';
import Dialog from '../../components/Dialog';
import ButtonDropdown from '../../components/ButtonDropdown';
import { Foul } from 'requests';
const foulTypes : Foul[] = ['inBot', 'damageBot', 'overExtChute', 'pinBot', 'podiumFoul', 
'stageFoul', 'tipEntangBot', 'zoneFoul']

function SuperApp() {
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();

    return (
        <main className='flex select-none flex-col items-center text-center'>
            <h1 className='col-span-4 my-8 text-3xl'>Super Scouting App</h1>
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


          
            
        </main>
    );
}

export default SuperApp;
