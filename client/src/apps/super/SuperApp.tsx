import { MaterialSymbol } from "react-material-symbols";
import LinkButton from "../../components/LinkButton";
import SignIn from "../../components/SignIn";
import Checkbox from "../../components/Checkbox";
import ReactDropdown from "react-dropdown";


function SuperApp() {
    const options = ['one', 'two', 'three'];
    const defaultOption = options[0];

    return (
        <main className='flex flex-col text-center items-center select-none'>
            <h1 className='text-3xl my-8 col-span-4'>Super Scouting App</h1>
            <div className='fixed left-4 top-4 z-20 p-2 rounded-md flex gap-2'>
                <LinkButton link='/' className='snap-none'><MaterialSymbol icon="home" 
                    size={80} fill grade={200} color='green' className='snap-none'/>
                </LinkButton>
            </div>
            <SignIn />
            <table className='text-left'>
                <tr>
                    <th>Fouls</th>
                    <td>
                        <ReactDropdown className='' 
                            options={options} value={defaultOption}>
                        </ReactDropdown>
                    </td>
                    <td>
                        <ReactDropdown 
                            options={options} value={defaultOption}>
                        </ReactDropdown>
                    </td>
                    <td>
                        <ReactDropdown 
                            options={options} value={defaultOption}>
                        </ReactDropdown>
                    </td>
                </tr>
                <tr>
                    <td>Reaching Into Bumpers</td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                </tr>
                <tr>
                    <td>Jumping Over Fence</td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                </tr>
                <tr>
                    <td>Banging On Glass</td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                </tr>
                <tr>
                    <td>Got Y/R Card</td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                </tr>
                <tr>
                    <td>Other Fouls</td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                    <td><Checkbox></Checkbox></td>
                </tr>
            </table>
        </main>
    );
}

export default SuperApp;
