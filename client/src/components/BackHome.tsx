
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function BackHome({
   
    className,
   
}: {
    
    className?: string;
   
}) {
    return (
        <>
            <Link to='/' className={className}>
                <Button
                    variant='outlined'
                    color='success'
                    style={{  fontSize: '20px', backgroundColor:'lightgray', borderColor:'darkgray', textAlign:'center', paddingLeft:'20px', paddingRight:'20px'}}>
                 <HomeIcon style={{ fontSize: '30px' }} />
                </Button>

            </Link>
        </>
    );
}

export default BackHome;
