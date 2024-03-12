import { AnalysisEntry, WindowData } from './data';
import { TeamData } from 'requests';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import StatTable from './components/StatTable';
import Dialog from '../../components/Dialog';
import StatDialog from './components/StatDialog';
import { useFetchJson } from '../../lib/useFetch';
import BarGraphDialog from './components/BarDialog';
import BarGraph from './components/BarGraph';
// import ScatterPlotDialog from './components/ScatterPlotDialog';
import ScatterPlotGraph from './components/ScatterPlotGraph';
import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import StatSummaryDialog from './components/StatSummaryDialog';
import StatSummary from './components/StatSummary';
import TeamSummaryDialog from './components/TeamSummaryDialog';
import TeamSummary from './components/TeamSummary';
import { Dispatch } from 'react';
import FinalPicklist from './components/FinalPicklist';

function generateWindow(
    data: AnalysisEntry[],
    table: WindowData,
    setTable: Dispatch<WindowData>,
    teamInfoJson: TeamData,
    addToFocused: Dispatch<WindowData>
) {
    switch (table.type) {
        case 'StatTable':
            return (
                <StatTable
                    data={data}
                    setTable={setTable}
                    table={table}
                    teamInfoJson={teamInfoJson}
                    onSubmit={addToFocused}
                />
            );
        case 'BarGraph':
            return (
                <BarGraph
                    data={data}
                    table={table}
                    teamInfoJson={teamInfoJson}
                />
            );
        case 'ScatterPlotGraph':
            return (
                <ScatterPlotGraph
                    data={data}
                    table={table}
                    teamInfoJson={teamInfoJson}
                />
            );
        case 'StatSummary':
            return (
                <StatSummary
                    data={data}
                    table={table}
                    teamInfoJson={teamInfoJson}
                />
            );
        case 'TeamSummary':
            return (
                <TeamSummary
                    data={data}
                    table={table}
                    teamInfoJson={teamInfoJson}
                />
            );
        default:
            return undefined;
    }
}

function PicklistApp() {
    const [analyzedData, reloadData] = useFetchJson<AnalysisEntry[]>(
        '/output_analysis.json'
    );
    const [teamInfo] = useFetchJson<TeamData>('/team_info.json');
    
    const [views, setViews, addToFocused, controls] =
        useWorkspaceState<WindowData>();

    return (
        <main className='grid h-screen grid-rows-[auto_1fr] relative overflow-hidden'>
            <div className='flex items-center border-b border-black py-3 bg-gray-100'>
                <LinkButton
                    link='/'
                    className='flex snap-none items-center justify-center px-2'>
                    <MaterialSymbol
                        icon='home'
                        size={50}
                        fill
                        grade={200}
                        color='black'
                        className='snap-none'
                    />
                </LinkButton>
                
                <button className='flex snap-none items-center justify-center px-2' onClick={reloadData} title="Refresh Data">
                    <MaterialSymbol icon="refresh" size={50} grade={200} color='black' className='snap-none'/>
                </button>
                
                <Dialog
                    trigger={open => (
                        <button className='flex snap-none items-center justify-center px-2' onClick={open} title="Add Stat Table">
                            <div className='flex items-center justify-center bg-gray-300 border border-black p-1'>
                                <MaterialSymbol icon="table" size={50} grade={200} color='black' className='snap-none'/>
                            </div>
                        </button>
                    )}>
                    {close => (
                        <StatDialog onSubmit={addToFocused} onClose={close} />
                    )}
                </Dialog>
                <Dialog
                    trigger={open => (
                        <button className='flex snap-none items-center justify-center px-2' onClick={open} title="Add Stat Summary">
                            <div className='flex items-center justify-center bg-gray-300 border border-black p-1'>
                                <MaterialSymbol icon="graphic_eq" size={50} grade={200} color='black' className='snap-none'/>
                            </div>
                        </button>
                    )}>
                    {close => (
                        <StatSummaryDialog
                            data={analyzedData || []}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog>
                <Dialog
                    trigger={open => (
                        <button className='flex snap-none items-center justify-center px-2' onClick={open} title="Add Bar Graph">
                            <div className='flex items-center justify-center bg-gray-300 border border-black p-1'>
                                <MaterialSymbol icon="bar_chart_4_bars" size={50} grade={200} color='black' className='snap-none'/>
                            </div>
                        </button>
                    )}>
                    {close => (
                        <BarGraphDialog
                            data={analyzedData || []}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog>
                {/* <Dialog
                    trigger={open => (
                        <button className='flex snap-none items-center justify-center px-2' onClick={open} title="Add Scatter Plot">
                            <div className='flex items-center justify-center bg-gray-300 border border-black p-1'>
                                <MaterialSymbol icon="scatter_plot" size={50} grade={200} color='black' className='snap-none'/>
                            </div>
                        </button>
                    )}>
                    {close => (
                        <ScatterPlotDialog
                            data={analyzedData || []}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog> */}
                <Dialog
                    trigger={open => (
                        <button className='flex snap-none items-center justify-center px-2' onClick={open} title="Add Team Summary">
                            <div className='flex items-center justify-center bg-gray-300 border border-black p-1'>
                                <MaterialSymbol icon="robot" size={50} grade={200} color='black' className='snap-none'/>
                            </div>
                        </button>
                    )}>
                    {close => (
                        <TeamSummaryDialog
                            data={analyzedData || []}
                            onSubmit={addToFocused}
                            onClose={close}
                        />
                    )}
                </Dialog>
                <h1 className='text-3xl font-bold flex-grow text-center xl:absolute xl:p-6 left-1/2 xl:-translate-x-1/2'>Statistical Analysis</h1>
            </div>
            <Workspace value={views} onChange={setViews} controls={controls}>
                {(value, onChange) => {
                    return (
                        analyzedData &&
                        generateWindow(
                            analyzedData,
                            value,
                            onChange,
                            teamInfo || {},
                            addToFocused
                        )
                    );
                }}
            </Workspace>
            <FinalPicklist />
        </main>
    );
}

export default PicklistApp;
