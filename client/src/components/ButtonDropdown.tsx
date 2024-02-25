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
                className={`${showDropdown ? 'bg-green-700' : 'bg-[#2f3646] text-white'} 
                rounded-md bg-[#171c26] p-5`}
                onClick={handleDropdown}>
                {children}
            </button>

            {showDropdown && (
                <div className='grid justify-center text-left border 
                border-white bg-[#2f3646] text-white p-5 z-50 absolute'>
                    {(Object.keys(value) as T[]).map((option, index) => (
                        <li key={index}>
                            <button onClick={() => handleOption(option)}>
                                Add {option} ({value[option] || 0})
                            </button>
                        </li>
                    ))}
                </div>
            )}
            <pre className='font-bold text-gray-400 pl-5'>
                Selected Options:{' '} <br/>
                {Object.entries(value)
                    .map(([option, count]) => `${option}: ${count}`)
                    .join(', \n') }
            </pre>
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
