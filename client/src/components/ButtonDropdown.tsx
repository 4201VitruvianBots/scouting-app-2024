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
                mt-5 rounded-md bg-[#171c26] p-5`}
                onClick={handleDropdown}>
                {children}
            </button>

            {showDropdown && (
                <div
                    className='absolute z-50 grid justify-center 
                gap-9 border border-white bg-[#2f3646] p-5 text-left text-white'>
                    {(Object.keys(value) as T[]).map((option, index) => (
                        <li key={index}>
                            <button onClick={() => handleOption(option)}>
                                Add {option} ({value[option] || 0})
                            </button>
                        </li>
                    ))}
                </div>
            )}
            <pre className='pb-5 pl-5 font-bold text-gray-400'>
                Selected Options: <br />
                {Object.entries(value)
                    .map(([option, count]) => `${option}: ${count}`)
                    .join(', \n')}
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
