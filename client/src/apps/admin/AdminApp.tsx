import LinkButton from "../../components/LinkButton";
import { useStatusRecieve } from '../../lib/useStatus';
import { ScouterTable } from "./components/ScouterTable";

function AdminApp() {
    const status = useStatusRecieve();

    return (
        <>
            <h1>Admin App</h1>
            <LinkButton link='/'>Home</LinkButton>
            <ScouterTable scouters={status.scouters}/>
        </>
    );
}

export default AdminApp;
