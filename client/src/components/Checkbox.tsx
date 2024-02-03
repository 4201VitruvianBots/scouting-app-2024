import { Dispatch, InputHTMLAttributes } from 'react';

function Checkbox({
    value,
    onChange,
    ...otherProps
}: {
    value?: boolean;
    onChange?: Dispatch<boolean>;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'checked'
>) {
    return (
        <input
            type='checkbox'
            checked={value}
            onChange={
                onChange ? event => onChange(event.target.checked) : undefined
            }
            {...otherProps}
        />
    );
}

export default Checkbox;
