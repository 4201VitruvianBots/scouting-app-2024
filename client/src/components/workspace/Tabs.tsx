import { FunctionComponent, useContext } from 'react';
import { StateProps, TabsData } from './workspaceData';
import { CreateTitleContext, TabChildContext } from './Workspace';
import { usePropState } from '../../lib/usePropState';
import { useArrayState } from '../../lib/useArrayState';

function Tabs<T>({ value, onChange }: StateProps<TabsData<T>>) {
    const [selected, setSelected] = usePropState(value, onChange, 'selected');
    const [tabs, setTabs] = usePropState(value, onChange, 'tabs');
    const tabsA = useArrayState(setTabs);

    const TabChild = useContext(TabChildContext) as FunctionComponent<
        StateProps<T>
    >;

    const createTitle = useContext(CreateTitleContext);

    return (
        <div className='flex h-full w-full flex-col'>
            <div className='flex flex-row overflow-x-auto border-b border-black'>
                {tabs.map((tab, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`cursor-pointer border-r border-black px-2 py-1 ${i !== selected ? 'text-neutral-500' : ''}`}>
                        {createTitle(tab, i)}
                    </div>
                ))}
            </div>
            <div className='flex-grow overflow-auto p-2'>
                <TabChild
                    value={tabs[selected]}
                    onChange={tab => tabsA.set(selected, tab)}
                />
            </div>
        </div>
    );
}

export default Tabs;
