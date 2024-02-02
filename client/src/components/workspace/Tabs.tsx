import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import {
    PaneData,
    SplitData,
    StateProps,
    TabsData,
    TabsSplice,
} from './workspaceData';
import {
    SetAddToFocusedContext,
    CreateTitleContext,
    DragContext,
    TabContentContext,
} from './workspaceContexts';
import { usePropState } from '../../lib/usePropState';
import { useArrayState } from '../../lib/useArrayState';
import Tab from './Tab';
import DropTarget from './DropTarget';

function Tabs<T>({
    value,
    onChange,
    onRemove,
    onReplaceHoriz,
    onReplaceVert,
}: StateProps<TabsData<T>> & {
    onRemove: () => void;
    onReplaceHoriz?: TabsSplice<T>;
    onReplaceVert?: TabsSplice<T>;
}) {
    const [selected, setSelected] = usePropState(value, onChange, 'selected');
    const [tabs, setTabs] = usePropState(value, onChange, 'tabs');
    const tabsA = useArrayState(setTabs);

    const tabContext = useContext(TabContentContext) as TabContentContext<T>;
    const createTitle = useContext(CreateTitleContext) as CreateTitleContext<T>;
    const setAddToFocused = useContext(
        SetAddToFocusedContext
    ) as SetAddToFocusedContext<T>;
    const [[dragging]] = useContext(DragContext) as DragContext<T>;

    const handleSplit = (vertical: boolean, start: boolean) => (other: T) => {
        const replaceFunction = vertical ? onReplaceVert : onReplaceHoriz;
        if (replaceFunction) {
            replaceFunction(value => [
                start ? new TabsData(other) : value,
                start ? value : new TabsData(other),
            ]);
            return;
        }
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
        // Passing a function to a setState will run it, so to set a state to a function a wrapper arrow is needed
        setAddToFocused(() => value => {
            tabsA.add(value);
            setSelected(tabs.length);
        });
    }, [setAddToFocused, setSelected, tabs.length, tabsA]);

    const tabCount = useRef(0);

    useEffect(() => {
        if (tabs.length > tabCount.current) handleFocus();
        tabCount.current = tabs.length;
    }, [handleFocus, tabs.length]);

    useEffect(() => {
        if (tabs.length === 0) {
            onRemove();
            return;
        }
    }, [onRemove, tabs.length]);

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
                        setSelected(
                            tabs.includes(value) ? tabs.length - 1 : tabs.length
                        );
                    }}
                    disabled={tabs.length === 1 && dragging === tabs[0]}
                    className='min-w-8 flex-grow'
                />
            </div>
            <div className='relative flex-grow basis-0'>
                <div className='absolute inset-0 overflow-auto p-2'>
                    {tabs[selected] &&
                        tabContext(tabs[selected], tab =>
                            tabsA.set(selected, tab as SetStateAction<T>)
                        )}
                </div>
                {dragging && !(tabs.length === 1 && tabs[0] === dragging) && (
                    <>
                        <DropTarget
                            onDrop={tabsA.add}
                            className='absolute inset-1/4'
                            areaClassName='absolute inset-0'
                        />
                        <DropTarget
                            onDrop={handleSplit(true, true)}
                            className='trapezoid-b absolute inset-x-0 top-0 h-1/4'
                            areaClassName='absolute inset-x-0 top-0 h-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(true, false)}
                            className='trapezoid-t absolute inset-x-0 bottom-0 h-1/4'
                            areaClassName='absolute inset-x-0 bottom-0 h-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(false, true)}
                            className='trapezoid-r absolute inset-y-0 left-0 w-1/4'
                            areaClassName='absolute inset-y-0 left-0 w-1/2'
                        />
                        <DropTarget
                            onDrop={handleSplit(false, false)}
                            className='trapzoid-l absolute inset-y-0 right-0 w-1/4'
                            areaClassName='absolute inset-y-0 right-0 w-1/2'
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Tabs;
