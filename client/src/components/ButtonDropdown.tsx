import { useState } from 'react';
import 'react-dropdown/style.css'

interface ButtonDropdownProps {
    options: Array<string>;
    children: string;
}

function ButtonDropdown({options, children} : ButtonDropdownProps) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [optionCounts, setOptionCounts] = useState<Record<string, number>>(
        options.reduce((acc, option) => ({ ...acc, [option]:  0 }), {})
    );

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOption = (option: string) => {
        setOptionCounts(prevCounts => ({
            ...prevCounts,
            [option]: (prevCounts[option] || 0) + 1
        }));
        setShowDropdown(false);
    }

    return (
        <main>
            <button
                className={`${showDropdown ? 'bg-green-700' : 'bg-gray-400'} 
                rounded-md bg-blue-100 p-5`}
                onClick={handleDropdown}>
                {children}
            </button>
          
            {showDropdown && 
            <div className=''>
               {options.map((option, index) => (
                    <li key={index}>
                        <button onClick={() => handleOption(option)}>
                            {option} ({optionCounts[option] || 0})
                        </button>
                    </li>
               ))}
            </div>
            }

            <p>Selected Options: {Object.entries(optionCounts)
                .map(([option, count]) => `${option}: ${count}`)
                .join(', ')}
            </p>    
        </main>
    );
}

export default ButtonDropdown;

/*
structure:
on click: show dropdown (state)
dropdown on click will add to FoulCount (or BreakCount, Defense)
state of FoulCount informs boxes shown below (boxes from array?)

*/