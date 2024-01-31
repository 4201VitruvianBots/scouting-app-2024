import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useRef,
    useState,
} from 'react';
import { PaneData, SplitData, TabsData } from './workspaceData';

type DragType = 'horizontal' | 'vertical' | undefined;

interface WorkspaceControls<T> {
    dragging: DragType;
    setDragging: Dispatch<SetStateAction<DragType>>;
    changeActiveTab: MutableRefObject<
        Dispatch<SetStateAction<TabsData<T>>> | undefined
    >;
}

function useWorkspaceState<T>(
    initialState: T | PaneData<T>
): [
    views: PaneData<T>,
    setViews: Dispatch<SetStateAction<PaneData<T>>>,
    handleAdd: Dispatch<T>,
    controls: WorkspaceControls<T>,
] {
    const [views, setViews] = useState<PaneData<T>>(() =>
        initialState instanceof SplitData || initialState instanceof TabsData
            ? initialState
            : new TabsData(initialState)
    );

    const [dragging, setDragging] = useState<DragType>();

    const changeActiveTab = useRef<Dispatch<SetStateAction<TabsData<T>>>>();

    const handleAdd = (tab: T) => {
        changeActiveTab.current?.(old => ({
            ...old,
            tabs: [...old.tabs, tab],
        }));
    };

    return [
        views,
        setViews,
        handleAdd,
        { dragging, setDragging, changeActiveTab },
    ];
}

// eslint-disable-next-line react-refresh/only-export-components
export { useWorkspaceState, type WorkspaceControls, type DragType };
