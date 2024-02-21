import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { PaneData, StateProps, TabBase, TabsData } from './workspaceData';
import Pane from './Pane';
import { ResizeType, WorkspaceControls } from './useWorkspaceState';
import { DragContext } from './workspaceContexts';
import MultiContext from '../../lib/MultiContext';
import {
    TabContentContext,
    ResizeContext,
    SetAddToFocusedContext,
} from './workspaceContexts';

function Workspace<T extends TabBase>({
    value,
    onChange,
    controls,
    children,
    className = '',
}: StateProps<PaneData<T> | undefined> & {
    controls: WorkspaceControls<T>;
    children: (value: T, onChange: Dispatch<SetStateAction<T>>) => ReactNode;
    className?: string;
}) {
    const { setAddToFocused } = controls;

    const [resizeType, setResizeType] = useState<ResizeType>();
    const [dragging, setDragging] = useState<
        [T, () => void] | [undefined, undefined]
    >([undefined, undefined]);

    return (
        <MultiContext
            contexts={[
                // THIS PART IS NOT TYPECHECKED! CHECK CAREFULLY!
                [TabContentContext, children],
                [ResizeContext, setResizeType],
                [DragContext, [dragging, setDragging]],
                [SetAddToFocusedContext, setAddToFocused],
            ]}>
            {value && (
                <Pane
                    value={value}
                    onChange={onChange as Dispatch<SetStateAction<PaneData<T>>>}
                    className={`${className} ${resizeType === 'vertical' ? 'cursor-ns-resize select-none' : resizeType === 'horizontal' ? 'cursor-ew-resize select-none' : ''}`}
                    onRemove={() => {
                        onChange(undefined);
                        setAddToFocused(
                            () => (value: T) => onChange(new TabsData(value))
                        );
                    }}
                />
            )}
        </MultiContext>
    );
}

export default Workspace;
