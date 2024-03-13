import { Dispatch } from 'react';
import { AnalysisEntry, StatTableData, WindowData } from '../data';
import { TeamData } from 'requests';
import Dialog from '../../../components/Dialog';
import StatColumnDialog from './StatColumnDialog';
import blankImage from '../../../images/blank.png';
import { MaterialSymbol } from 'react-material-symbols';
import camelToSpaced from '../../../lib/camelCaseConvert';
import RobotPhotoDialog from './RobotPhotoDialog';
import TeamItem from './TeamItem';

function StatTable({
    table,
    setTable,
    data,
    teamInfoJson,
    onSubmit,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
    setTable: Dispatch<StatTableData>;
    teamInfoJson: TeamData;
    onSubmit: Dispatch<WindowData>;
}) {
    let sortedData: AnalysisEntry[];
    
    if (table.weighted) {
        sortedData = [...data].sort(
            (a, b) => {
                let aSum = 0;
                let bSum = 0;
                for (let i = 0; i < table.columns.length; i++) {
                    aSum += (a[table.columns[i]] as number) * (table.weights[i] ?? 0);
                    bSum += (b[table.columns[i]] as number) * (table.weights[i] ?? 0);
                }
                return (aSum - bSum) * (table.ascending ? 1 : -1);
            }
        );
    } else {
        sortedData = table.sortColumn
            ? [...data].sort(
                (a, b) =>
                    ((a[table.sortColumn!] as number) -
                        (b[table.sortColumn!] as number)) *
                    (table.ascending ? 1 : -1)
            )
            : data;
    }

    // Handle when a StatColumn component is clicked
    function handleClickColumn(sortColumn: string) {
        if (sortColumn === table.sortColumn) {
            setTable({ ...table, ascending: !table.ascending });
            return;
        }
        setTable({ ...table, sortColumn });
    }

    // Handle when the new StatColumn is submitted
    function handleAddColumn(column: string) {
        const data = { ...table, columns: [...table.columns, column], weights: [...table.weights, 0] }
        setTable(data);
    }

    // Handle when a StatColumn component is deleted
    function handleDeleteColumn(index: number) {
        setTable({
            ...table,
            columns: table.columns.filter((_, i) => i !== index),
            weights: table.weights.filter((_, i) => i !== index),
        });
    }
    
    // Handle when the weights of the stat column are changed
    function handleWeightChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(event.target.value);
        
        setTable({...table, weights: table.weights.map((e, i) => index === i ? value : e)});
    }
    
    // Handle when a stat on the stat table is clicked
    function handleStatSummaryClick(column: string) {
        onSubmit({title: camelToSpaced(column), type: 'StatSummary', column: column});
    }

    return (
        <div className="space-y-2">
            <button className="border border-black">
                Add To Final Picklist
            </button>
            <table className='border border-black'>
                <thead className='sticky top-0 border border-black'>
                    <tr className='border border-black'>
                        <th colSpan={2} className='border border-black'>
                            Team
                        </th>
                        {table.columns.map((column, i) => (
                            column === "robotImages" ? (
                                <th className='space-x-2 text-wrap max-w-20'>
                                    {camelToSpaced(column)}
                                    <button onClick={() => handleDeleteColumn(i)}>
                                        <MaterialSymbol icon='close' />
                                    </button>
                                </th>
                            ) : (
                                <th className='space-x-2 text-wrap max-w-20'>
                                    {camelToSpaced(column)}
                                    {table.weighted ? <>
                                            <br />
                                            <input type='number' onChange={(event) => handleWeightChange(i, event)} className="w-12" />
                                        </>
                                        :
                                        <button onClick={() => handleClickColumn(column)}>
                                            {column === table.sortColumn ? (
                                                table.ascending ? (
                                                    <MaterialSymbol icon='arrow_upward_alt' />
                                                ) : (
                                                    <MaterialSymbol icon='arrow_downward_alt' />
                                                )
                                            ) : (
                                                <MaterialSymbol icon='swap_vert' />
                                            )}
                                        </button>
                                    }
                                    <button onClick={() => handleStatSummaryClick(column)}>
                                        <MaterialSymbol icon='info' />
                                    </button>
                                    <button onClick={() => handleDeleteColumn(i)}>
                                        <MaterialSymbol icon='close' />
                                    </button>
                                </th>
                            )
                        ))}
                        <th>
                            <Dialog
                                trigger={open => (
                                    <button className='px-4' onClick={open}>
                                        <MaterialSymbol icon='add' />
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
                        </th>
                    </tr>
                </thead>
                <tbody className='border border-black'>
                    {sortedData.map(entry => (
                        <tr className='border border-black'>
                            <TeamItem
                                teamNumber={entry.teamNumber}
                                teamInfoJson={teamInfoJson}
                                onSubmit={onSubmit}
                            />
                            {table.columns.map(column => (
                                column === "robotImages" ? (
                                    <td className='border border-black border-separate'>
                                        <Dialog
                                            trigger={open => (
                                                <button onClick={open}>
                                                    <img src={`/image/${entry.teamNumber}.jpeg`} width="100" height="100" alt=""
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {e.currentTarget.src = blankImage}} />
                                                </button>
                                            )}
                                            >
                                            {close => (
                                                <RobotPhotoDialog teamNumber={entry.teamNumber} onClose={close} />
                                            )}
                                        </Dialog>
                                    </td>
                                ) : (
                                    <td className='border border-black'>{entry[column]}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatTable;
