import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { PaneData, SplitData, StateProps, TabsData } from './workspaceData';
import {
    AddToFocusedContext,
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
    const addToFocusedRef = useContext(AddToFocusedContext) as MutableRefObject<
        Dispatch<T> | undefined
    >;
    const [[dragging]] = useContext(DragContext) as DragContext<T>;

    const handleSplit = (vertical: boolean, start: boolean) => (other: T) => {
        (onChange as Dispatch<SetStateAction<PaneData<T>>>)(
            value =>
                new SplitData(
                    vertical,
                    start ? new TabsData(other) : value,
                    start ? value : new TabsData(other)
                )
        );
    };

    const handleFocus = useCallback(() => {
        console.log('Focus changed');
        addToFocusedRef.current = tabsA.add;
        console.log(addToFocusedRef.current);
    }, [addToFocusedRef, tabsA.add]);

    const tabCount = useRef(0);

    useEffect(() => {
        if (tabs.length > tabCount.current) handleFocus();
        tabCount.current = tabs.length;
    }, [handleFocus, tabs.length]);

    return (
        <div className='flex h-full w-full flex-col' onClick={handleFocus}>
            <div className='flex flex-row overflow-x-auto border-b border-black'>
                {tabs.map((tab, i) => (
                    <Tab
                        key={i}
                        onClick={() => setSelected(i)}
                        selected={selected === i}
                        title={createTitle(tab, i)}
                        value={tab}
                        onInsertBefore={value => {
                            tabsA.insert(i, value);
                            setSelected(i);
                        }}
                        onRemove={() => {
                            // If that was the last tab
                            if (tabs.length === 1) {
                                onRemove();
                                return;
                            }
                            tabsA.remove(i);
                            // If the selected tab does not exist
                            if (tabs.length - 2 < selected)
                                setSelected(selected - 1);
                        }}
                    />
                ))}
                <DropTarget
                    onDrop={(value: T) => {
                        tabsA.add(value);
                        setSelected(tabs.length);
                    }}
                    className='min-w-8 flex-grow'
                />
            </div>
            <div className='relative flex-grow overflow-auto p-2'>
                {tabContext(tabs[selected], tab =>
                    tabsA.set(selected, tab as SetStateAction<T>)
                )}
                {dragging && !(tabs.length === 1 && tabs[0] === dragging) && (
                    <div className='absolute inset-0 grid grid-cols-[1fr_2fr_1fr] grid-rows-[1fr_2fr_1fr]'>
                        <DropTarget
                            onDrop={tabsA.add}
                            className='col-start-2 row-start-2'
                            areaClassName='absolute inset-0'
                        />
                        <DropTarget
                            onDrop={handleSplit(true, true)}
                            className='col-start-2 row-start-1'
                            areaClassName='absolute inset-x-0 top-0 h-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(true, false)}
                            className='col-start-2 row-start-3'
                            areaClassName='absolute inset-x-0 bottom-0 h-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(false, true)}
                            className='col-start-1 row-start-2'
                            areaClassName='absolute inset-y-0 left-0 w-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(false, false)}
                            className='col-start-3 row-start-2'
                            areaClassName='absolute inset-y-0 right-0 w-1/2'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;
