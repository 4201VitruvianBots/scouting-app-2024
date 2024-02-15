import LinkButton from "../../components/LinkButton";
import { useStatusRecieve } from '../../lib/useStatus';

function AdminApp() {
    const status = useStatusRecieve();

    return (
        <>
            <h1>Admin App</h1>
            <LinkButton link='/'>Home</LinkButton>
            <>{JSON.stringify(status)}</>
        </>
    );
}

export default AdminApp;
