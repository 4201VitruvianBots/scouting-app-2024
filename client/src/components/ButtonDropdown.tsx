import { Dispatch, ReactNode, useState } from 'react';
import 'react-dropdown/style.css';

function ButtonDropdown<T extends string>({
    value,
    setValue,
    children,
}: {
    value: Record<T, number>;
    setValue: Dispatch<Record<T, number>>;
    children?: ReactNode;
}) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOption = (option: T) => {
        setValue({ ...value, [option]: value[option] + 1 });
        setShowDropdown(false);
    };

    return (
        <div>
            <button
                className={`${showDropdown ? 'bg-green-700' : 'bg-gray-400'} 
                rounded-md bg-blue-100 p-5`}
                onClick={handleDropdown}>
                {children}
            </button>

            {showDropdown && (
                <div className=''>
                    {(Object.keys(value) as T[]).map((option, index) => (
                        <li key={index}>
                            <button onClick={() => handleOption(option)}>
                                {option} ({value[option] || 0})
                            </button>
                        </li>
                    ))}
                </div>
            )}

            <p>
                Selected Options:{' '}
                {Object.entries(value)
                    .map(([option, count]) => `${option}: ${count}`)
                    .join(', ')}
            </p>
        </div>
    );
}

export default ButtonDropdown;

/*
structure:
on click: show dropdown (state)
dropdown on click will add to FoulCount (or BreakCount, Defense)
state of FoulCount informs boxes shown below (boxes from array?)

*/
