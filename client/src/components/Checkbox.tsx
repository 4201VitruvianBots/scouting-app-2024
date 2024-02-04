import { ReactNode } from "react";

function Checkbox({
    className,
    boxClassName = '',
    children,
    onChange,
    checked
} : {
    className? : string,
    boxClassName?: string,
    children? : ReactNode;
    onChange? : (value: boolean) => void;
    checked? : boolean
}) {
    return(
        <label className={`${className} select-none`}>
            <input type='checkbox' checked={checked} className={boxClassName}
            onChange={event => onChange?.(event.target.checked)}/> 
            {children}
        </label>
    );
}

export default Checkbox