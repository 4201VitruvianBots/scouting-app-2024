import { AnalysisEntry, WindowData } from './data';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import StatTable from './components/StatTable';
import { useFetchJson } from '../../lib/useFetchJson';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';
import BarGraphDialog from './components/BarGraphDialog';
import { BarChart } from 'reaviz';
import BarGraph from './components/BarGraph';
// import ScatterPlot from './components/ScatterPlot';

function generateWindow(data: AnalysisEntry[], table: WindowData) {
    switch (table.type) {
        case 'StatTable':
            return <StatTable data={data} table={table} />;
        case 'BarGraph':
            return <BarGraph data={data} table={table} />;
        // case 'ScatterPlot':
        //     return <ScatterPlot data={data} table={table} />;
        default:
            return undefined;
    }

}

function PicklistApp() {
    const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews, addToFocused, controls] =
        useWorkspaceState<WindowData>();
    
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
                <Dialog
                    trigger={open => (
                        <button onClick={open}>Add Bar Graph</button>
                    )}>
                    {close => (
                        <BarGraphDialog
                            data={analyzedData || []}
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
                        analyzedData && generateWindow(analyzedData, value)
                    );
                }}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
