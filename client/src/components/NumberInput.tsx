import { Dispatch, InputHTMLAttributes, RefObject } from 'react';

function NumberInput({
    value,
    onChange,
    className,
    ...otherProps
}: {
    value?: number | undefined;
    onChange?: Dispatch<number | undefined> ;
    ref?: RefObject<HTMLInputElement>;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'>) {
    return (
        <input
            className={className}
            value={value?? ''}
            type='number'
            onChange={
                onChange ? event => onChange(event.target.value?parseFloat(event.target.value): undefined) : undefined
            }
            {...otherProps}
        />
    );
}

export default NumberInput;