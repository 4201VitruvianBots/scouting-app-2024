import { Link } from "react-router-dom";
import {ReactNode} from 'react';

function LinkButton({
    link,
    className,
    children
}: {
    link: string;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <>
            <Link to={link} className='contents'>
                <button className={className}>{children}</button>
            </Link>
        </>
    );
}

export default LinkButton