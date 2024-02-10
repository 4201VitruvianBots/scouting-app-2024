import { Dispatch, InputHTMLAttributes, RefObject } from 'react';

function TextInput({
    value,
    onChange,
    ...otherProps
}: {
    value?: string;
    onChange?: Dispatch<string>;
    ref?: RefObject<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
    return (
        <input
            value={value}
            onChange={
                onChange ? event => onChange(event.target.value) : undefined
            }
            {...otherProps}
        />
    );
}

export default TextInput;
