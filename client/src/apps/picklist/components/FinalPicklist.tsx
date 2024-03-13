import { Dispatch, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { WindowData } from '../data';
import { TeamData } from 'requests';
import TeamItem from './TeamItem';

function FinalPicklist(
    {
        teamInfoJson,
        onSubmit,
    }: {
        teamInfoJson: TeamData;
        onSubmit: Dispatch<WindowData>;
    }
) {
    const [expanded, setExpanded] = useState(false);
    
    const [picklist, setPicklist] = useState<number[]>([4201, 4481, 4501, 1912]);
    
    function handleExpand() {
        setExpanded(!expanded);
    }
    
    function handleRemoveTeam(index: number) {
        setPicklist(picklist.filter((_, i) => i !== index));
    }
    
    return (
        <div className={`absolute right-0 bg-gray-300 border-gray-800 border-2 rounded-2xl p-2 ${expanded ? "top-40 h-full" : "-bottom-5"} items-start`}>
            <button onClick={handleExpand} className="flex space-x-80">
                <p className="text-2xl">Final Picklist</p>
                <MaterialSymbol icon={expanded ? "arrow_drop_down" : "arrow_drop_up"} size={40}/>
            </button>
            {expanded ?
                <div className="text-center text-2xl space-y-3">
                    {picklist.map((team, i) => {return (
                        <div className="flex justify-center">
                            <TeamItem teamNumber={team} teamInfoJson={teamInfoJson} onSubmit={onSubmit}/>
                            <button onClick={() => handleRemoveTeam(i)}>
                                <MaterialSymbol icon='close' />
                            </button>
                        </div>);})}
                </div>
                : <></>
            }
        </div>
  );
}

export default FinalPicklist;