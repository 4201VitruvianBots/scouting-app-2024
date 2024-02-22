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
            <div className='flex items-center border-b border-black'>
                <LinkButton
                    link='/'
                    className='flex snap-none items-center justify-center px-5'>
                    <MaterialSymbol
                        icon='home'
                        size={30}
                        fill
                        grade={200}
                        color='black'
                        className='snap-none'
                    />
                </LinkButton>

                <Dialog
                    trigger={open => (
                        <button className='px-4' onClick={open}>
                            Add Stat Table
                        </button>
                    )}>
                    {close => (
                        <StatDialog onSubmit={addToFocused} onClose={close} />
                    )}
                </Dialog>
                <Dialog
                    trigger={open => (
                        <button className='px-4' onClick={open}>
                            Add Stat Summary
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
                        <button className='px-4' onClick={open}>
                            Add Bar Graph
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
                        <button className='px-4' onClick={open}>
                            Add Scatter Plot
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
                        <button className='px-4' onClick={open}>
                            Add Team Summary
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
