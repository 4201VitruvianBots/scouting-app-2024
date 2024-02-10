import { AnalysisEntry, TableData } from './data';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import StatTable from './components/StatTable';
import { useFetchJson } from '../../lib/useFetchJson';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';

function PicklistApp() {
    const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews, addToFocused, controls] =
        useWorkspaceState<TableData>();

    return (
        <main className='grid h-screen grid-rows-[auto_1fr]'>
            <div className='border-b border-black'>
                <Dialog
                    trigger={open => (
                        <button onClick={open}>Add Stat Table</button>
                    )}>
                    {close => (
                        <StatDialog
                            data={analyzedData}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog>
            </div>
            <Workspace
                value={views}
                onChange={setViews}
                controls={controls}
                title={table => table.title}>
                {value => {
                    return (
                        analyzedData && (
                            <StatTable data={analyzedData} table={value} />
                        )
                    );
                }}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
