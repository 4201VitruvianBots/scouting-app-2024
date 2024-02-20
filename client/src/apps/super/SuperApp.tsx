import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import SignIn from '../../components/SignIn';
import ReactDropdown from 'react-dropdown';
import Checkbox from '../../components/Checkbox';
import { useState } from 'react';
import { SuperPosition } from 'requests';
import Dialog from '../../components/Dialog';

function SuperApp() {
    const tempOptions = ['one', 'two', 'three'];
    const defaultOption = tempOptions[0];
    const [scouterName, setScouterName] = useState('');
    const [superPosition, setSuperPosition] = useState<SuperPosition>();


    return (
        <main className='flex select-none flex-col items-center text-center'>
            <h1 className='col-span-4 my-8 text-3xl'>Super Scouting App</h1>
            <div className='fixed left-4 top-4 z-20 flex gap-2 rounded-md p-2'>
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
            <Dialog
                    trigger={open => (
                        <button onClick={open}>
                            <MaterialSymbol
                                icon='account_circle'
                                size={60}
                                fill
                                grade={200}
                                className={` ${scouterName && superPosition ? 'text-green-400' : 'text-gray-400'} snap-none`}
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


          
            <table className='text-left'>
                <tr>
                    <th>Fouls</th>
                    <td>
                        <ReactDropdown
                            className=''
                            options={tempOptions}
                            value={defaultOption}></ReactDropdown>
                    </td>
                    <td>
                        <ReactDropdown
                            options={tempOptions}
                            value={defaultOption}></ReactDropdown>
                    </td>
                    <td>
                        <ReactDropdown
                            options={tempOptions}
                            value={defaultOption}></ReactDropdown>
                    </td>
                </tr>
                <tr>
                    <td>Reaching Into Bumpers</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
                <tr>
                    <td>Jumping Over Fence</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
                <tr>
                    <td>Banging On Glass</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
                <tr>
                    <td>Got Y/R Card</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
                <tr>
                    <td>Other Fouls</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>Played Defense?</td>
                    <td>
                        <Checkbox />
                    </td>
                    <td>
                        <Checkbox />
                    </td>
                    <td>
                        <Checkbox />
                    </td>
                </tr>
                <tr>
                    <td>Was Defended?</td>
                    <td>
                        <Checkbox />
                    </td>
                    <td>
                        <Checkbox />
                    </td>
                    <td>
                        <Checkbox />
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>Mechanical Break?</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
                <tr>
                    <td>Comms/Software Break?</td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                    <td>
                        <input type='number' className='border'></input>
                    </td>
                </tr>
            </table>
        </main>
    );
}

export default SuperApp;
