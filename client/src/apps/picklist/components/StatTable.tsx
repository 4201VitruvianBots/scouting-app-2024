import { createRef } from 'react';
import base64toImage from '../../../lib/base64toImage';
import { AnalysisEntry, StatColumnData, StatTableData, TeamInfoEntry } from '../data';
import StatColumn from './StatColumn';

function StatTable({
    table,
    data,
    teamInfoJson,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
    teamInfoJson: TeamInfoEntry;
}) {
    // Create an empty list of StatColumn components
    let statColumns: React.RefObject<typeof StatColumn>[] = [];
    
    // Create a ref for each StatColumn component
    let statColumnRefs = data.map(() => createRef<typeof StatColumn>());
    
    // Create a variable for the sort order
    let sortOrder: number[] | undefined = undefined;
    
    // Create the avatar column for each team number
    
    // Handle when a StatColumn component is clicked
        // Store the new sort order
        // Update the sort order of all the StatColumn components
        // Update the sort order of the avatars and team numbers
    
    // Handle when the add column button is clicked
        // Create a new StatColumnDialog
    
    // Handle when the new StatColumn is submitted
        // Create a new StatColumn component with the correct sort order
        // Add the new StatColumn component to the list of StatColumn components
    
    // Handle when a StatColumn component is deleted
        // Remove the StatColumn component from the list of StatColumn components
    
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
                    {/* Render the team number column */}
                    {/* Render each StatColumn component */}
                </tbody>
            </table>
            <button className="border-black">+ Add Column</button>
        </div>
    );
}

export default StatTable;
