import { AnalysisEntry, WindowData } from './data';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import StatTable from './components/StatTable';
import { useFetchJson } from '../../lib/useFetchJson';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';
import BarGraphDialog from './components/BarDialog';
import BarGraph from './components/BarGraph';
import ScatterPlotDialog from './components/ScatterPlotDialog';
import ScatterPlotGraph from './components/ScatterPlotGraph';

function generateWindow(data: AnalysisEntry[], table: WindowData) {
    switch (table.type) {
        case 'StatTable':
            return <StatTable data={data} table={table} />;
        case 'BarGraph':
            return <BarGraph data={data} table={table} />;
        case 'ScatterPlotGraph':
            return <ScatterPlotGraph data={data} table={table} />;
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
                        <button className="px-4" onClick={open}>Add Stat Table</button>
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
                        <button className="px-4" onClick={open}>Add Bar Graph</button>
                    )}>
                    {close => (
                        <BarGraphDialog
                            data={analyzedData || []}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog>
                <Dialog
                    trigger={open => (
                        <button className="px-4" onClick={open}>Add Scatter Plot</button>
                    )}>
                    {close => (
                        <ScatterPlotDialog
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
