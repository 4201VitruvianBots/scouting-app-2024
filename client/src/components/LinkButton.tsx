import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function LinkButton({
    link,
    icon,
    className,
    children,
  
}: {
    link: string;
    icon?: ReactNode;
    className?: string;
    children?: string;
   
}) {
    return (
        <>
            <Link to={link} className={className}>
                <Button
                    variant='outlined'
                    color='success'
                    style={{ width: '100%', height: '100%', fontSize: '30px', backgroundColor:'lightgray', borderColor:'darkgray'}}
                    startIcon={icon}>
                    {children}
                    
                </Button>
                
            </Link>
        </>
    );
}

export default LinkButton;