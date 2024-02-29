import { Dispatch, InputHTMLAttributes, RefObject } from 'react';

function NumberInput({
    value,
    onChange,
    ...otherProps
}: {
    value?: number | undefined;
    onChange?: Dispatch<number | undefined> ;
    ref?: RefObject<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
    return (
        <input
            value={value?? ''}
            onChange={
                onChange ? event => onChange(event.target.value?parseFloat(event.target.value): undefined) : undefined
            }
            {...otherProps}
        />
    );
}

export default NumberInput;