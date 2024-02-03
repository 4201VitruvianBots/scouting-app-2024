import { ReactNode } from "react";

function Checkbox({
    children,
    onChange,
    checked
} : {
    children? : ReactNode;
    onChange? : (value: boolean) => void;
    checked? : boolean
}) {
    return(
        <label><input type='checkbox' checked={checked}
            onChange={event => onChange?.(event.target.checked)}/> 
            {children}
        </label>
    );
}

export default Checkbox