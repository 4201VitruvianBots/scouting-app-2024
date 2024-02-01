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
    addToFocused: MutableRefObject<Dispatch<T> | undefined>;
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

    const addToFocused = useRef<Dispatch<SetStateAction<T>>>();

    return [
        views,
        setViews,
        addToFocused.current ?? (() => {}),
        { addToFocused },
    ];
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

const AddToFocusedContext = createContext<
    MutableRefObject<Dispatch<unknown> | undefined>
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
    AddToFocusedContext,
    CreateTitleContext,
    type WorkspaceControls,
    type ResizeType,
};
