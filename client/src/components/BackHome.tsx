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
                    style={{ width: '6%', height: '10%', fontSize: '20px', backgroundColor:'lightgray', borderColor:'darkgray', textAlign:'center'}}
                    startIcon={icon}>
                {children}
                </Button>
            </Link>
        </>
    );
}

export default BackHome;
