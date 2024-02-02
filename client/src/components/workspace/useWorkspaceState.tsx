import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';
import { PaneData, SplitData, TabsData } from './workspaceData';

type ResizeType = 'horizontal' | 'vertical' | undefined;

interface WorkspaceControls<T> {
    setAddToFocused: Dispatch<Dispatch<T>>;
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

    const [addToFocused, setAddToFocused] = useState<Dispatch<T>>(() => {});

    return [views, setViews, addToFocused, { setAddToFocused }];
}

const TabContentContext = createContext<
    (value: unknown, onChange: Dispatch<SetStateAction<unknown>>) => ReactNode
>(() => undefined);

const ResizeContext = createContext<Dispatch<SetStateAction<ResizeType>>>(
    () => {}
);

const DragContext = createContext<DragContext<unknown>>([
    [undefined, undefined],
    () => {},
]);

type DragContext<T> = [
    [T, () => void] | [undefined, undefined],
    Dispatch<SetStateAction<[T, () => void] | [undefined, undefined]>>,
];

const SetAddToFocusedContext = createContext<Dispatch<Dispatch<unknown>>>(
    () => {}
);

const CreateTitleContext = createContext<
    (value: unknown, index: number) => string
>((_, index) => `Tab ${index}`);

export {
    // eslint-disable-next-line react-refresh/only-export-components
    useWorkspaceState,
    TabContentContext,
    ResizeContext,
    DragContext,
    SetAddToFocusedContext,
    CreateTitleContext,
    type WorkspaceControls,
    type ResizeType,
};
