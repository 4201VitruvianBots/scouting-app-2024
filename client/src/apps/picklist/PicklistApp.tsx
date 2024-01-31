import { useEffect, useState } from 'react';
import { TableData } from './data';
import {
    PaneData,
    SplitData,
    TabsData,
} from '../../components/workspace/workspaceData';
import Workspace from '../../components/workspace/Workspace';

function PicklistApp() {
    // const analyzedData = useFetchJson<AnalysisEntry[]>('/output_analysis.json');

    const [views, setViews] = useState<PaneData<TableData>>(
        new SplitData(
            [
                new TabsData([
                    { ascending: false, column: 'teamNumber', title: 'hi' },
                ]),
                new TabsData([
                    { ascending: false, column: 'teamNumber', title: 'hi' },
                ]),
                new SplitData(
                    [
                        new TabsData([
                            {
                                ascending: false,
                                column: 'teamNumber',
                                title: 'hi',
                            },
                        ]),
                        new TabsData([
                            {
                                ascending: false,
                                column: 'teamNumber',
                                title: 'hi',
                            },
                        ]),
                    ],
                    false
                ),
            ],
            true
        )
    );

    useEffect(() => {
        if (views.type === 'split') {
            setViews({
                ...views,
                sizes: [300, 300],
                panes: [
                    ...views.panes.slice(0, 2),
                    {
                        ...(views.panes[2] as SplitData<TableData>),
                        sizes: [300],
                    },
                ],
            });
        }
    }, []);

    return (
        <main>
            <Workspace value={views} onChange={setViews} className='h-screen'>
                {({ value }) => <div>{value.title}</div>}
            </Workspace>
        </main>
    );
}

export default PicklistApp;
