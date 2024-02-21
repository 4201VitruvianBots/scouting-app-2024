import { MaterialSymbol } from "react-material-symbols";
import LinkButton from "../../components/LinkButton";
import { useStatusRecieve } from '../../lib/useStatus';
import { ScouterTable } from "./components/ScouterTable";
import { MatchTable } from "./components/MatchTable";
//import { useFetchJson } from "../../lib/useFetch";




function AdminApp() {
    const status = useStatusRecieve();

    console.log(status.matches)

   // const [schedule] = useFetchJson<MatchSchedule>('/matchSchedule.json');

    
    return (
        <main className='flex select-none flex-col items-center text-center w-screen h-screen'>
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

            <div className="grid grid-cols-2 gap-4 items-center justify-center">
                    <div>
                    <ScouterTable scouters={status.scouters} />
                    <p className="my-6">phrog :3</p>
                    </div>

            <div>
            <p>Match Display</p>
            <div className="table-container">
                
            </div>
            </div>
            </div>
           <MatchTable matches={status.matches}></MatchTable>

            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th> </th>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default AdminApp;
