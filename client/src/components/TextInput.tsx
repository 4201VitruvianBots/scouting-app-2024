import { Dispatch, InputHTMLAttributes } from 'react';

function TextInput({
    value,
    onChange,
    ...otherProps
}: {
    value?: string;
    onChange?: Dispatch<string>;
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
