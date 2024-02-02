import { TableData } from './data';
import { TabsData } from '../../components/workspace/workspaceData';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import TextInput from '../../components/TextInput';

function PicklistApp() {
    // const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews, addToFocused, controls] =
        useWorkspaceState<TableData>(
            new TabsData({
                ascending: false,
                column: 'teamNumber',
                title: 'A',
            })
        );

    return (
        <main className='grid h-screen grid-rows-[auto_1fr]'>
            <div className='border-b border-black'>
                <button
                    onClick={() =>
                        addToFocused({
                            ascending: false,
                            column: 'hi',
                            title: 'IIIIIII',
                        })
                    }>
                    +
                </button>
            </div>
            <Workspace
                value={views}
                onChange={setViews}
                controls={controls}
                title={table => table.title}>
                {/* {(value, onChange) => <StatTable data={analyzedData} table={value} />} */}
                {(value, onChange) => (
                    <TextInput
                        value={value.title}
                        onChange={title => onChange({ ...value, title })}
                    />
                )}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
