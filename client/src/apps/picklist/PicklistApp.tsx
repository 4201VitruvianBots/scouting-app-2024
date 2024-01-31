import { TableData } from './data';
import { SplitData, TabsData } from '../../components/workspace/workspaceData';
import Workspace from '../../components/workspace/Workspace';
import { useWorkspaceState } from '../../components/workspace/useWorkspaceState';
import TextInput from '../../components/TextInput';
import { Dispatch, SetStateAction } from 'react';

function TableRender({
    value,
    onChange,
}: {
    value: TableData;
    onChange: Dispatch<SetStateAction<TableData>>;
}) {
    return (
        <TextInput
            value={value.title}
            onChange={title => onChange({ ...value, title })}
        />
    );
}

function PicklistApp() {
    // const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews, handleAdd, controls] = useWorkspaceState<TableData>(
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
                {TableRender}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
