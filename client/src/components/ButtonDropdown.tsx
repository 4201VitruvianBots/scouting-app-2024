import { useState } from 'react';

import 'react-dropdown/style.css'


function ButtonDropdown({
    options,
    children
} : {
    options: Array<string>;
    children: string
}) {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [fouls, setFouls] = useState<Array<string>>([]);

    const handleDropdown = () => {
        setShowDropdown(true);
    };

    const handleClose = (option: string) => {
        setFouls(prevOptions => [...prevOptions, option])
        setShowDropdown(!showDropdown);

    }

    return (
        <main>
            <button
                className={`${showDropdown ? 'bg-green-700' : 'bg-gray-400'} rounded-md bg-blue-100 p-5`}
                onClick={handleDropdown}>
                {children}
            </button>
          
            {showDropdown && 
            <div>
               {options.map((option, index) => (
                    <li key={index}>
                        <button onClick={() => handleClose(option)}>{option}</button>
                    </li>
               ))}

            </div>
            }

<p>Selected Options: {fouls.join(', ')}</p>
               
          
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
