import { Dispatch } from 'react';

function Select<T extends string = string>({
    options,
    value,
    placeholder = value,
    onChange,
}: {
    options: T[] | [value: T, label: string][];
    value?: T | undefined;
    placeholder?: string;
    onChange?: Dispatch<T>;
}) {
    const optionSplit = typeof options[0] !== 'string';

    return (
        <select
            value={value ?? 'PLACEHOLDER'}
            onChange={
                onChange
                    ? event => onChange(event.target.value as T)
                    : undefined
            }>
            {value === undefined && (
                <option value={'PLACEHOLDER'} hidden disabled>
                    {placeholder}
                </option>
            )}
            {options.map((e, i) => (
                <option key={i} value={optionSplit ? e[0] : e}>
                    {optionSplit ? e[1] : e}
                </option>
            ))}
        </select>
    );
}

export default Select;
