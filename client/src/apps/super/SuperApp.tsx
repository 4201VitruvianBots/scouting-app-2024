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
                    <td>Comms/Software Break?</td>
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

            <div className='bg- grid w-[400px] grid-flow-col auto-rows-fr grid-cols-2 grid-rows-[auto_1fr_1fr] justify-center gap-3 selection:box-border'>
                <h2 className='col-span-2 row-start-1 justify-self-center p-1 text-2xl font-medium text-green-600'>
                    Break Type
                </h2>

                <div className='col-start-1 row-start-2 grid '>
                    <p>Mechanical</p>

                    <Checkbox
                        className='py-1  text-lg'
                        boxClassName='w-5 h-5 m-3'>
                        Result of driver's choice
                    </Checkbox>

                    <Checkbox
                        className='py-1 text-lg'
                        boxClassName='w-5 h-5 m-3'>
                        Battery fell out
                    </Checkbox>

                    <Checkbox
                        className=' py-1 text-lg '
                        boxClassName='w-5 h-5 m-3'>
                        Resorted to all defense
                    </Checkbox>
                </div>

                <div className='col-start-2 row-start-2 grid gap-3'>
                    <p>Software/Comms</p>

                    <Checkbox className=' bg-green-300 text-xl '>
                        Robot "come back"
                    </Checkbox>
                    <p> out for... </p>
                    <ReactDropdown
                        className=''
                        options={['0-30s', '30-60s', '1-2 mins', '2+ mins']}
                        value={defaultOption}></ReactDropdown>
                </div>
            </div>
        </main>
    );
}

export default SuperApp;
