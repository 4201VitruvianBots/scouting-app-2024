import { RefObject, useRef } from 'react';
import base64toImage from '../../../lib/base64toImage';
import { AnalysisEntry, StatColumnData, StatTableData, TeamInfoEntry } from '../data';
import StatColumn, { StatColumnProps, StatColumnRef } from './StatColumn';
import Dialog from '../../../components/Dialog';
import StatColumnDialog from './StatColumnDialog';

function StatTable({
    table,
    data,
    teamInfoJson,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfoEntry;
}) {
    // Create an empty list of StatColumn refs
    let statColumnRefs: RefObject<StatColumnRef>[] = [];
    let statColumnProps: StatColumnProps[] = [];
    
    // Create a variable for the sort order
    let sortOrder: number[] | undefined = undefined;
    
    function generateAvatarImages(teamNumbers: string[]) {
        let teamAvatars = teamNumbers.map(() => ''); // Create a list of the avatar data for each team based on the base64 images stored under the key 'avatar' in the team_info.json file
        
        const empty64x64Base64: string = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAOUlEQVR42u3OIQEAAAACIP1/2hkWWEBzVgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYF3YDicAEE8VTiYAAAAAElFTkSuQmCC";
        
        if (teamInfoJson !== undefined) {
            teamAvatars = teamNumbers.map(teamNumber => {
                if (teamInfoJson[teamNumber]?.avatar !== undefined) {
                    return teamInfoJson[teamNumber]?.avatar;
                } else {
                    return empty64x64Base64;
                }
            }).filter(Boolean) as string[];
        }
        
        let avatarImages = teamAvatars.map(base64toImage); // Convert the base64 images to an array of Image objects
        
        return avatarImages;
    }
    let avatarImages = generateAvatarImages(Object.keys(teamInfoJson));
    
    // Handle when a StatColumn component is clicked
    function handleOnClick(teamNumbers: number[]) {
        // Store the new sort order
        sortOrder = teamNumbers;
        
        // Update the sort order of all the StatColumn components
        statColumnProps.forEach((statColumnProp, index) => {
            statColumnProp.sortOrder = sortOrder;

            statColumnRefs[index].current?.onOtherClick(sortOrder || []);
        });
        
        // Update the sort order of the avatars and team numbers
        avatarImages = generateAvatarImages(sortOrder.map(String));
    }
    
    // Handle when the new StatColumn is submitted
    function handleAddColumn(columnData: StatColumnData) {
        // Create a new StatColumn reference and add it to the list of StatColumn references
        statColumnRefs.push(useRef<StatColumnRef>(null));
        
        // Create a new set of StatColumnProps with the correct sort order and add it to the list of StatColumnProps
        statColumnProps.push({
            table: columnData,
            data: data,
            onClick: handleOnClick,
            sortOrder: sortOrder,
            onDelete: handleDeleteColumn,
            index: statColumnRefs.length - 1,
        });
    }
    
    // Handle when a StatColumn component is deleted
    function handleDeleteColumn(index: number) {
        // Remove the StatColumn component from the list of StatColumn components
        statColumnRefs.splice(index, 1);
    }
    
    return (
        <div className="flex space-x-4">
            <table>
                <thead className='sticky top-0'>
                    <tr>
                        <th colSpan={2} className="bg-white">{table.title}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render the avatar column */}
                    {avatarImages.map((avatar, index) => (
                        <tr key={index}>
                            <td>
                                <img src={avatar.src} width="32" height="32" />
                            </td>
                        </tr>
                    ))}
                    
                    {/* Render the team number column (I don't think this'll get updated though TODO: fix) */}
                    {Object.keys(teamInfoJson).map((teamNumber, index) => (
                        <tr key={index}>
                            <td>{teamNumber}</td>
                        </tr>
                    ))}
                    
                    {/* Render each StatColumn component */}
                    {statColumnProps.map((statColumnProp, index) => (
                        <StatColumn
                            ref={statColumnRefs[index]}
                            key={index}
                            {...statColumnProp}
                        />
                    ))}
                </tbody>
            </table>
            <Dialog
                    trigger={open => (
                        <button className='px-4' onClick={open}>
                            + Add Column
                        </button>
                    )}>
                    {close => (
                        <StatColumnDialog
                            data={data}
                            onSubmit={handleAddColumn}
                            onClose={close}
                        />
                    )}
            </Dialog>
        </div>
    );
}

export default StatTable;
