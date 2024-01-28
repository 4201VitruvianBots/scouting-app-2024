import BackHome from "../../components/BackHome";
import HomeIcon from '@mui/icons-material/Home';
import { useFetchString } from '../../lib/useFetchString';

function ReconApp() {
    // Example fetching
    const analyzedData = useFetchString('/output_analysis.csv');

    return (
        <>
            <h1>Recon App</h1>
            <BackHome
                link='/'
                icon={<HomeIcon style={{ fontSize: '30px' }} />}></BackHome>
            <p>{analyzedData ?? 'Data loading...'}</p>
        </>
    );
}

export default ReconApp;
