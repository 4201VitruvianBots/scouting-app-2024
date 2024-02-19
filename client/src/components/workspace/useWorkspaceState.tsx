import { Dispatch, SetStateAction, useState } from 'react';
import { PaneData, SplitData, TabBase, TabsData } from './workspaceData';

type ResizeType = 'horizontal' | 'vertical' | undefined;

interface WorkspaceControls<T extends TabBase> {
    setAddToFocused: Dispatch<Dispatch<T>>;
}

function useWorkspaceState<T extends TabBase>(
    initialState?: T | PaneData<T> | undefined
): [
    views: PaneData<T> | undefined,
    setViews: Dispatch<SetStateAction<PaneData<T> | undefined>>,
    handleAdd: Dispatch<T>,
    controls: WorkspaceControls<T>,
] {
    const [views, setViews] = useState<PaneData<T> | undefined>(() =>
        initialState === undefined
            ? undefined
            : initialState instanceof SplitData ||
                initialState instanceof TabsData
              ? initialState
              : new TabsData(initialState)
    );

    const [addToFocused, setAddToFocused] = useState<Dispatch<T>>(
        views === undefined
            ? () => (value: T) => setViews(new TabsData(value))
            : () => () => {}
    );

    return [views, setViews, addToFocused, { setAddToFocused }];
}

export {
    // eslint-disable-next-line react-refresh/only-export-components
    useWorkspaceState,
    type WorkspaceControls,
    type ResizeType,
};
