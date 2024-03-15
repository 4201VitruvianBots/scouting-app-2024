import { Dispatch, useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { AnalysisEntry, WindowData } from '../data';
import { TeamData } from 'requests';
import TeamItem from './TeamItem';
import SelectSearch from 'react-select-search';

function picklist(
    {
        teamInfoJson,
        onSubmit,
        data,
        picklist,
        setPicklist
    }: {
        teamInfoJson: TeamData;
        onSubmit: Dispatch<WindowData>;
        data: AnalysisEntry[] | undefined;
        picklist: number[];
        setPicklist: Dispatch<number[]>;
    }
) {
    // Get all team numbers from the json data
    const teamNumbers = data?.map(e => e.teamNumber.toString()) ?? [];
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = useState(false);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newTeamNumber, setNewTeamNumber] = useState<string>();
    
    function handleExpand() {
        setExpanded(!expanded);
    }
    
    function handleRemoveTeam(index: number) {
        setPicklist(picklist.filter((_, i) => i !== index));
    }
    
    function moveTeamNumber(index: number, up: boolean) {
        if (up && index > 0) {
            setPicklist(picklist.slice(0, index - 1).concat(picklist[index], picklist[index - 1], picklist.slice(index + 1)));
        } else if (index < picklist.length - 1) {
            setPicklist(picklist.slice(0, index).concat(picklist[index + 1], picklist[index], picklist.slice(index + 2)));
        }
    }
    
    function addNewTeamNumber(teamNumber: string) {
        if (teamNumber && !picklist.includes(Number(teamNumber))) {
            setPicklist([...picklist, Number(teamNumber)]);
            setNewTeamNumber('Select Team');
        }
    }
    
    return (
        <div className={`absolute right-0 bg-gray-300 border-gray-800 border-2 rounded-2xl p-2 ${expanded ? "top-40 bottom-0" : "-bottom-5"} items-start flex flex-col`}>
            <button onClick={handleExpand} className="flex space-x-80">
                <p className="text-2xl">Final Picklist</p>
                <MaterialSymbol icon={expanded ? "arrow_drop_down" : "arrow_drop_up"} size={40}/>
            </button>
            {expanded ?
                <>
                    <div className="text-center text-2xl space-y-3 overflow-y-auto self-stretch">
                        {picklist.map((team, i) => {return (
                            <div className="flex justify-center">
                                <div className="flex flex-col -space-y-3">
                                    <button onClick={() => moveTeamNumber(i, true)}>
                                        <MaterialSymbol icon='arrow_drop_up' />
                                    </button>
                                    <button onClick={() => moveTeamNumber(i, false)}>
                                        <MaterialSymbol icon='arrow_drop_down' />
                                    </button>
                                </div>
                                <TeamItem teamNumber={team} teamInfoJson={teamInfoJson} onSubmit={onSubmit}/>
                                <button onClick={() => handleRemoveTeam(i)}>
                                    <MaterialSymbol icon='close' />
                                </button>
                            </div>
                        );})}
                    </div>
                    <div className="self-center">
                        <SelectSearch
                                options={teamNumbers.map(e => ({ value: e, name: e }))}
                                value={newTeamNumber}
                                onChange={value => addNewTeamNumber(value as string)}
                                placeholder='Select Team'
                                search
                        />
                    </div>
                </>
            : <></>
            }
        </div>
  );
}

export default picklist;