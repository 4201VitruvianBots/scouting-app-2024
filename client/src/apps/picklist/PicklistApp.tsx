import { useState } from 'react';
import { useFetchJson } from '../../lib/useFetchJson';
import { AnalysisEntry, TableData } from './data';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';
import StatTable from './components/StatTable';

function PicklistApp() {
    const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [tables, setTables] = useState<TableData[]>([]);

    const addTable = (table: TableData) => setTables([...tables, table]);

    return (
        <main className='flex h-screen gap-4 p-8'>
            {analyzedData &&
                tables.map((table, i) => (
                    <StatTable data={analyzedData} table={table} key={i} />
                ))}
            <div className='grid min-w-16 flex-grow place-items-center'>
                <Dialog
                    open
                    trigger={open => <button onClick={open}>+</button>}>
                    {close => (
                        <StatDialog
                            data={analyzedData}
                            onSubmit={addTable}
                            onClose={close}
                        />
                    )}
                </Dialog>
            </div>
        </main>
    );
}

export default PicklistApp;
