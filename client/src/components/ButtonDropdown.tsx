import { useState } from 'react';
import 'react-dropdown/style.css';
import { TeamStates } from '../apps/super/SuperApp';

interface ButtonDropdownProps {
    options: Array<string>;
    children: string;
    teamStates: TeamStates;
    setTeamStates: React.Dispatch<React.SetStateAction<TeamStates>>;
}

function ButtonDropdown({options, children, teamStates, setTeamStates} : ButtonDropdownProps) {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOption = (option: string) => {
        setTeamStates(prevTeamStates => ({
            ...prevTeamStates,
            foulCounts: {[option]: (prevTeamStates.foulCounts[option] || 0) + 1}
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
                            {option} ({teamStates.foulCounts[option] || 0})
                        </button>
                    </li>
               ))}
            </div>
            }

            <p>Selected Options: {Object.entries(teamStates)
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