import { Link } from "react-router-dom";

function LinkButton({
    link,
    className,
    children
}: {
    link: string;
    className?: string;
    children?: string;
}) {
    return (
        <>
            <Link to={link}>
                <button className={className}>{children}</button>
            </Link>
        </>
    );
}

export default LinkButton