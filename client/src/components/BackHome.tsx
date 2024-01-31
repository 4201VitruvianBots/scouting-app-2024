import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function BackHome({
    link,
    className,
    children,
}: {
    link: string;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <>
            <Link to={link} className={className}>
                <Button
                    variant='outlined'
                    color='success'
                    style={{  fontSize: '20px', backgroundColor:'lightgray', borderColor:'darkgray', textAlign:'center', paddingLeft:'20px', paddingRight:'20px'}}>
                {children}
                </Button>
            </Link>
        </>
    );
}

export default BackHome;
