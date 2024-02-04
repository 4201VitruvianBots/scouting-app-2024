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
        className={`${className?.[index]} ${v === value ? 'bg-green-700' : 'bg-gray-400'} px-3 py-3`}>
            {labels[index]}
        </button>)
    );
}

export default MultiButton