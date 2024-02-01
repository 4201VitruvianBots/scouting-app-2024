import { SetStateAction, useContext } from 'react';
import { StateProps, TabsData } from './workspaceData';
import { CreateTitleContext, TabContentContext } from './useWorkspaceState';
import { usePropState } from '../../lib/usePropState';
import { useArrayState } from '../../lib/useArrayState';
import Tab from './Tab';

function Tabs<T>({ value, onChange }: StateProps<TabsData<T>>) {
    const [selected, setSelected] = usePropState(value, onChange, 'selected');
    const [tabs, setTabs] = usePropState(value, onChange, 'tabs');
    const tabsA = useArrayState(setTabs);

    const tabContext = useContext(TabContentContext);
    const createTitle = useContext(CreateTitleContext);

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
                        //TODO
                        onRemove={() => {}}
                    />
                ))}
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
