import BackHome from "../../components/BackHome";

import { useFetchString } from '../../lib/useFetchString';

function ReconApp() {
    // Example fetching
    const analyzedData = useFetchString('/output_analysis.csv');

    return (
        <>
            <h1>Recon App</h1>

            <BackHome/>
            <p>{analyzedData ?? 'Data loading...'}</p>
        </>
    );
}

export default ReconApp;
