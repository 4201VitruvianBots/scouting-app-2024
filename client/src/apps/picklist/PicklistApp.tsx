import { useState } from 'react';
import { useFetchJson } from '../../lib/useFetchJson';
import { AnalysisEntry, SimpleTable } from './data';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';
import StatTable from './components/StatTable';

function PicklistApp() {
    const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [tables, setTables] = useState<SimpleTable[]>([]);

    return (
        <main className='flex h-screen'>
            {analyzedData &&
                tables.map((table, i) => (
                    <StatTable data={analyzedData} table={table} key={i} />
                ))}
            <Dialog open trigger={open => <button onClick={open}>+</button>}>
                {close =>
                    analyzedData && (
                        <StatDialog
                            data={analyzedData}
                            onSubmit={table => {
                                setTables([...tables, table]);
                                close();
                            }}
                        />
                    )
                }
            </Dialog>
        </main>
    );
}

export default PicklistApp;
