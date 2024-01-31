import { FunctionComponent, useContext } from 'react';
import { StateProps, TabsData } from './workspaceData';
import { TabChildContext } from './Workspace';

function Tabs<T>({ value, onChange }: StateProps<TabsData<T>>) {
    const tab = value.tabs[0];
    const TabChild = useContext(TabChildContext) as FunctionComponent<
        StateProps<T>
    >;

    // TODO
    return <TabChild value={tab} onChange={() => undefined} />;
}

export default Tabs;
