import { AnalysisEntry, WindowData, TeamInfo } from './data';
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
import { MaterialSymbol } from 'react-material-symbols';
import LinkButton from '../../components/LinkButton';
import StatSummaryDialog from './components/StatSummaryDialog';
import StatSummary from './components/StatSummary';
import TeamSummaryDialog from './components/TeamSummaryDialog';
import TeamSummary from './components/TeamSummary';
import { Dispatch } from 'react';

function generateWindow(
    data: AnalysisEntry[],
    table: WindowData,
    setTable: Dispatch<WindowData>,
    teamInfoJson: TeamInfo
) {
    switch (table.type) {
        case 'StatTable':
            return (
                <StatTable
                    data={data}
                    setTable={setTable}
                    table={table}
                    teamInfoJson={teamInfoJson}
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
    const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');
    const teamInfo = useFetchJson<TeamInfo>('/team_info.json');

    const [views, setViews, addToFocused, controls] =
        useWorkspaceState<WindowData>();

    return (
        <main className='grid h-screen grid-rows-[auto_1fr]'>
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
                <Dialog
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
                </Dialog>
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
                <h1 className='text-3xl font-bold fixed left-1/2 transform -translate-x-1/2'>Statistical Analysis</h1>
            </div>
            <Workspace value={views} onChange={setViews} controls={controls}>
                {(value, onChange) => {
                    return (
                        analyzedData &&
                        generateWindow(
                            analyzedData,
                            value,
                            onChange,
                            teamInfo || {}
                        )
                    );
                }}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
