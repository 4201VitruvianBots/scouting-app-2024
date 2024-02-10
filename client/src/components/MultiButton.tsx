function MultiButton<T>({
    className ='',
    onChange,
    values,
    labels,
    value, 
    selectedClassName = 'bg-green-700', 
    unSelectedClassName = 'bg-gray-400'
} : {
    className?: string | string[];
    onChange: (value : T) => void;
    values: T[];
    labels: string[];
    value: T | undefined;
    selectedClassName?: string | string[];
    unSelectedClassName?: string | string[];

}) {
    return(
        values.map((v, index) => 
        <button onClick={() => onChange(v)} 
        className={`${typeof className === "string" ? className : className[index]} ${v === value ? (typeof selectedClassName === "string" ? selectedClassName : selectedClassName[index]) : (typeof unSelectedClassName === "string" ? unSelectedClassName : unSelectedClassName[index])} px-3 py-3`}>
            {labels[index]}
        </button>)
    );
}

export default MultiButton