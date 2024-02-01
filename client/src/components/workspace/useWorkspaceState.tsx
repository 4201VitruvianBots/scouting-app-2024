import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
    useRef,
    useState,
} from 'react';
import { PaneData, SplitData, TabsData } from './workspaceData';

type ResizeType = 'horizontal' | 'vertical' | undefined;

interface WorkspaceControls<T> {
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

    const changeActiveTab = useRef<Dispatch<SetStateAction<TabsData<T>>>>();

    const handleAdd = (tab: T) => {
        changeActiveTab.current?.(old => ({
            ...old,
            tabs: [...old.tabs, tab],
        }));
    };

    return [views, setViews, handleAdd, { changeActiveTab }];
}

const TabContentContext = createContext<
    (value: unknown, onChange: Dispatch<SetStateAction<unknown>>) => ReactNode
>(() => undefined);

const ResizeContext = createContext<Dispatch<SetStateAction<ResizeType>>>(
    () => {}
);

const DragContext = createContext<[unknown, Dispatch<SetStateAction<unknown>>]>(
    [undefined, () => {}]
);

const ChangeActiveTabContext = createContext<
    MutableRefObject<Dispatch<SetStateAction<TabsData<unknown>>> | undefined>
>({ current: undefined });

const CreateTitleContext = createContext<
    (value: unknown, index: number) => string
>((_, index) => `Tab ${index}`);

export {
    // eslint-disable-next-line react-refresh/only-export-components
    useWorkspaceState,
    TabContentContext,
    ResizeContext,
    DragContext,
    ChangeActiveTabContext,
    CreateTitleContext,
    type WorkspaceControls,
    type ResizeType,
};
