import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

function FinalPicklist() {
    const [expanded, setExpanded] = useState(false);
    
    function handleExpand() {
        setExpanded(!expanded);
    }
    
    return (
        <div className={`absolute right-0 bg-gray-300 border-gray-800 border-2 rounded-2xl p-2 ${expanded ? "top-40 h-full" : "-bottom-5"} items-start`}>
            <button onClick={handleExpand} className="flex space-x-80">
                <p className="text-2xl">Final Picklist</p>
                <MaterialSymbol icon={expanded ? "arrow_drop_down" : "arrow_drop_up"} size={40}/>
            </button>
        </div>
  );
}

export default FinalPicklist;