import { Dispatch } from 'react';
import { AnalysisEntry, StatTableData, TeamInfo, WindowData } from '../data';
import Dialog from '../../../components/Dialog';
import StatColumnDialog from './StatColumnDialog';
import blankImage from '../../../images/blank.png';
import { MaterialSymbol } from 'react-material-symbols';
import camelToSpaced from '../../../lib/camelCaseConvert';

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
    teamInfoJson: TeamInfo;
    onSubmit: Dispatch<WindowData>;
}) {
    let sortedData: AnalysisEntry[];
    
    if (table.weighted) {
        sortedData = table.weights ? data.sort(
            (a, b) => {
                let aSum = 0;
                let bSum = 0;
                for (let i = 0; i < table.columns.length; i++) {
                    aSum += (a[table.columns[i]] as number) * (table.weights?.[i] ?? 0);
                    bSum += (b[table.columns[i]] as number) * (table.weights?.[i] ?? 0);
                }
                return (aSum - bSum) * (table.ascending ? 1 : -1);
            }
        ) : data;
        table.weights = [];
    }
    else {
        sortedData = table.sortColumn
            ? data.sort(
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
        setTable({ ...table, columns: [...table.columns, column], weights: [...table.weights, 0] });
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
    
    // Handle when a team on the stat table is clicked
    function handleTeamSummaryClick(teamNumber: number) {
        onSubmit({title: "Team " + teamNumber + " Summary", type: 'TeamSummary', teamNumber: teamNumber});
    }
    
    // Handle when a stat on the stat table is clicked
    function handleStatSummaryClick(column: string) {
        onSubmit({title: camelToSpaced(column), type: 'StatSummary', column: column});
    }

    return (
        <table className='border border-black'>
            <thead className='sticky top-0 border border-black'>
                <tr className='border border-black'>
                    <th colSpan={2} className='border border-black'>
                        Team
                    </th>
                    {table.columns.map((column, i) => (
                        <th className='space-x-2'>
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
                        <td>
                            <img
                                src={
                                    teamInfoJson[entry.teamNumber].avatar
                                        ? `data:image/png;base64,${teamInfoJson[entry.teamNumber].avatar}`
                                        : blankImage
                                }
                            />
                        </td>
                        <td>
                            {entry.teamNumber}
                            <button onClick={() => handleTeamSummaryClick(entry.teamNumber)}>
                                    <MaterialSymbol icon='info' />
                            </button>
                        </td>
                        {table.columns.map(column => (
                            <td className='border border-black'>{entry[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StatTable;
