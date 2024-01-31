import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function BackHome({
    link,
    icon,
    className,
    children,
}: {
    link: string;
    icon: ReactNode;
    className?: string;
    children?: string;
}) {
    return (
        <>
            <Link to={link} className={className}>
                <Button
                    variant='outlined'
                    color='success'
                    style={{ width: '10%', height: '100%', fontSize: '20px', backgroundColor:'lightgray', borderColor:'darkgray', textAlign:'center', padding:'5px'}}
                    startIcon={icon}>
                {children}
                </Button>
            </Link>
        </>
    );
}

export default BackHome;
