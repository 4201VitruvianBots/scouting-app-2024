import { Dispatch } from 'react';
import { AnalysisEntry, StatTableData, TeamInfo } from '../data';
import Dialog from '../../../components/Dialog';
import StatColumnDialog from './StatColumnDialog';
import blankImage from '../../../images/blank.png';
import { MaterialSymbol } from 'react-material-symbols';

function StatTable({
    table,
    setTable,
    data,
    teamInfoJson,
}: {
    table: StatTableData;
    data: AnalysisEntry[];
    setTable: Dispatch<StatTableData>;
    teamInfoJson: TeamInfo;
}) {
    const sortedData = table.sortColumn
        ? data.sort(
              (a, b) =>
                  ((a[table.sortColumn!] as number) -
                      (b[table.sortColumn!] as number)) *
                  (table.ascending ? 1 : -1)
          )
        : data;

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
        setTable({ ...table, columns: [...table.columns, column] });
    }

    // Handle when a StatColumn component is deleted
    function handleDeleteColumn(index: number) {
        setTable({
            ...table,
            columns: table.columns.filter((_, i) => i !== index),
        });
    }

    return (
        <table>
            <thead className='sticky top-0'>
                <tr>
                    <th colSpan={2} className='bg-white'>
                        {table.title}
                    </th>
                    {table.columns.map((column, i) => (
                        <th>
                            {column}
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
            <tbody>
                {sortedData.map(entry => (
                    <tr>
                        <td>
                            <img
                                src={
                                    teamInfoJson[entry.teamNumber].avatar
                                        ? `data:image/png;base64,${teamInfoJson[entry.teamNumber].avatar}`
                                        : blankImage
                                }
                            />
                        </td>
                        <td>{entry.teamNumber}</td>
                        {table.columns.map(column => (
                            <td>{entry[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StatTable;
