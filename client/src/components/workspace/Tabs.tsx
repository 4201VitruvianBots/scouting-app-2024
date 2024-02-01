import { SetStateAction, useContext } from 'react';
import { StateProps, TabsData } from './workspaceData';
import {
    CreateTitleContext,
    DragContext,
    TabContentContext,
} from './useWorkspaceState';
import { usePropState } from '../../lib/usePropState';
import { useArrayState } from '../../lib/useArrayState';
import Tab from './Tab';
import DropTarget from './DropTarget';

function Tabs<T>({
    value,
    onChange,
    onRemove,
}: StateProps<TabsData<T>> & { onRemove: () => void }) {
    const [selected, setSelected] = usePropState(value, onChange, 'selected');
    const [tabs, setTabs] = usePropState(value, onChange, 'tabs');
    const tabsA = useArrayState(setTabs);

    const tabContext = useContext(TabContentContext);
    const createTitle = useContext(CreateTitleContext);

    const dragging = useContext(DragContext)[0] as T;

    return (
        <div className='flex h-full w-full flex-col'>
            <div className='flex flex-row overflow-x-auto border-b border-black'>
                {tabs.map((tab, i) => (
                    <Tab
                        key={i}
                        onClick={() => setSelected(i)}
                        selected={selected === i}
                        title={createTitle(tab, i)}
                        value={tab}
                        onInsertBefore={value => tabsA.insert(i, value)}
                        onRemove={() => {
                            console.log(tabs);
                            // If that was the last tab
                            if (tabs.length === 1) {
                                onRemove();
                                return;
                            }
                            if (tab === dragging) {
                                tabsA.remove(i);
                            } else {
                                tabsA.remove(i + 1);
                            }
                            // If the selected item does not exist
                            if (tabs.length - 2 < selected)
                                setSelected(selected - 1);
                        }}
                    />
                ))}
                <DropTarget onDrop={tabsA.add} className='min-w-8 flex-grow' />
            </div>
            <div className='flex-grow overflow-auto p-2'>
                {tabContext(tabs[selected], tab =>
                    tabsA.set(selected, tab as SetStateAction<T>)
                )}
            </div>
        </div>
    );
}

export default Tabs;
