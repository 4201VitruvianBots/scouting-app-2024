import { TableData } from './data';
import { SplitData, TabsData } from '../../components/workspace/workspaceData';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import TextInput from '../../components/TextInput';

function PicklistApp() {
    // const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews, addToActive, controls] =
        useWorkspaceState<TableData>(
            SplitData.Horizontal(
                new TabsData({
                    ascending: false,
                    column: 'teamNumber',
                    title: 'hi',
                }),
                new TabsData({
                    ascending: false,
                    column: 'teamNumber',
                    title: 'hi',
                }),
                SplitData.Vertical(
                    new TabsData(
                        {
                            ascending: false,
                            column: 'teamNumber',
                            title: 'hi',
                        },
                        {
                            ascending: false,
                            column: 'teamNumber',
                            title: 'hi',
                        },
                        {
                            ascending: false,
                            column: 'teamNumber',
                            title: 'hi',
                        }
                    ),
                    new TabsData({
                        ascending: false,
                        column: 'teamNumber',
                        title: 'hi',
                    })
                )
            )
        );

    return (
        <main>
            <Workspace
                value={views}
                onChange={setViews}
                controls={controls}
                title={table => table.title}
                className='h-screen'>
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
