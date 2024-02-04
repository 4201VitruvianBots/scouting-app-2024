function MultiButton<T>({
    className,
    onChange,
    values,
    labels,
    value
} : {
    className?: string[];
    onChange: (value : T) => void;
    values: T[];
    labels: string[];
    value: T;
}) {
    return(
        values.map((v, index) => 
        <button onClick={() => onChange(v)} 
        className={`${className?.[index]} ${v === value ? '' : ''}`}>
            {labels[index]}
        </button>)
    );
}

export default MultiButton