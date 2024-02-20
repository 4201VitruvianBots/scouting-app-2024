import { MaterialSymbol } from "react-material-symbols";
import LinkButton from "../../components/LinkButton";
import { useStatusRecieve } from '../../lib/useStatus';
import { ScouterTable } from "./components/ScouterTable";

function AdminApp() {
    const status = useStatusRecieve();

    return (
        <main className='flex select-none flex-col items-center text-center '>
            <h1 className='col-span-4 my-8 text-3xl'>Admin Interface</h1>

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

            <div className="flex columns-2">
            <ScouterTable scouters={status.scouters}/>
            <p>hey</p>

            </div>
            
        </main>
    );
}

export default AdminApp;
