//import { matchDataAggregations } from "requests";
import LinkButton from "../../components/LinkButton";
//import { useFetchJson } from "../../lib/useFetch";

function ReconApp() {
    // const [retrieve, reloadRetrieve] = useFetchJson<matchDataAggregations>('/data/retrieve')

    return (
        <>
            <h1>Recon App</h1>
            <LinkButton link='/'>Home</LinkButton>
            <p></p>
        </>
    );
}

export default ReconApp;
