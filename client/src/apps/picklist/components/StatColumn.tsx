import { forwardRef, useImperativeHandle, useRef } from "react";
import ArrowButton from "../../../components/ArrowButton";
import { AnalysisEntry, StatColumnData } from "../data";
import { ArrowComponentRef } from "../../../components/ArrowButton";
import { MaterialSymbol } from "react-material-symbols";

// Define the type of the ref that will be used in StatTable
interface StatColumnRef {
    // onOtherClick is called by other components when another arrow button is clicked
    onOtherClick: (teamNumbers: number[]) => void
}

interface StatColumnProps {
    table: StatColumnData,
    data: AnalysisEntry[],
    // onClick is called by this component when the sort order is changed
    onClick: (teamNumbers: number[]) => void,
    // If this is the first column, sortOrder is undefined and the stat column sorts by team number
    sortOrder: number[] | undefined,
    // onDelete is called by this component when the delete button is clicked
    onDelete: (index: number) => void,
    index: number;
}

const StatColumn = forwardRef<StatColumnRef, StatColumnProps>(({
    table,
    data,
    onClick,
    sortOrder,
    onDelete,
    index
}, ref) => {
    // Create a ref for ArrowComponent
    const arrowComponentRef = useRef<ArrowComponentRef>(null);
    
    const entries = data.map<[number, number]>(e => [
        e.teamNumber,
        e[table.column] as number,
    ]);
    
    // If this is the first column, sort by team number
    let sortedEntries = entries.sort((a, b) => a[0] - b[0]);
    
    // If this is not the first column, sort by the column
    if (sortOrder !== undefined) {
        sortedEntries = entries.sort((a, b) => {
            const aIndex = sortOrder.indexOf(a[0]);
            const bIndex = sortOrder.indexOf(b[0]);
            return aIndex - bIndex;
        });
    }
    
    // Handle when this arrow button is clicked
    const handleOnClick = (ascending: boolean) => {
        // Resort the entries based on the new sort order
        sortedEntries = entries.sort((a, b) => a[1] - b[1]);
        if (!ascending) sortedEntries.reverse();
        
        // Tell the parent table that this arrow button was clicked
        onClick(sortedEntries.map(e => e[0]));
    }
    
    // Handle when another arrow button is clicked, taking in the argument teamNumbers
    const handleOnOtherClick = (teamNumbers: number[]) => {
        // Resort the entries based on the new sort order
        sortedEntries = entries.sort((a, b) => {
            const aIndex = teamNumbers.indexOf(a[0]);
            const bIndex = teamNumbers.indexOf(b[0]);
            return aIndex - bIndex;
        });
        arrowComponentRef.current?.onOtherClick();
    }
    
    const handleOnDelete = () => {
        onDelete(index);
    }
    
    // Expose handleOnOtherClick to the parent component
    useImperativeHandle(ref, () => ({
        onOtherClick: handleOnOtherClick
    }));
    
    return (
        <table>
            <thead className='sticky top-0'>
                <tr className="bg-gray-300">
                    <ArrowButton ref={arrowComponentRef} onClick={handleOnClick} />
                    <th colSpan={2}>{table.title}</th>
                    <th>
                        <button onClick={handleOnDelete} className='grid aspect-square h-3/4 rounded-full hover:bg-gray-500/50'>
                            <MaterialSymbol icon='close' />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedEntries.map(([, datapoint], i) => (
                    <tr key={i}>
                        <td>{datapoint}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default StatColumn;
export type { StatColumnRef, StatColumnProps };