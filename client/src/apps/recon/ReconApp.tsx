//import { matchDataAggregations } from "requests";
import LinkButton from "../../components/LinkButton";
//import { useFetchJson } from "../../lib/useFetchJson";

function ReconApp() {;
    // const retrieve = useFetchJson<matchDataAggregations>('/data/retrieve')

    return (
        <>
            <h1>Recon App</h1>
            <LinkButton link='/'>Home</LinkButton>
            <p></p>
        </>
    );
}

export default ReconApp;
