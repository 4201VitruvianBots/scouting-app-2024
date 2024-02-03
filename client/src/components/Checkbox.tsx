import { ReactNode } from "react";

function Checkbox({
    className,
    children,
    onChange,
    checked
} : {
    className? : string
    children? : ReactNode;
    onChange? : (value: boolean) => void;
    checked? : boolean
}) {
    return(
        <label className={`${className} select-none`}><input type='checkbox' checked={checked}
            onChange={event => onChange?.(event.target.checked)}/> 
            {children}
        </label>
    );
}

export default Checkbox