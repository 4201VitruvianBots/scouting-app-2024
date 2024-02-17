import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { PaneData, StateProps, TabsData } from './workspaceData';
import Pane from './Pane';
import { WorkspaceControls } from './useWorkspaceState';
import { DragContext } from './workspaceContexts';
import MultiContext from '../../lib/MultiContext';
import {
    TabContentContext,
    ResizeContext,
    SetAddToFocusedContext,
    CreateTitleContext,
} from './workspaceContexts';

function Workspace<T>({
    value,
    onChange,
    controls,
    children,
    title,
    className = '',
}: StateProps<PaneData<T> | undefined> & {
    controls: WorkspaceControls<T>;
    children: (value: T, onChange: Dispatch<SetStateAction<T>>) => ReactNode;
    title: (value: T) => string;
    className?: string;
}) {
    const { setAddToFocused } = controls;

    const [resizeType, setResizeType] = useState<T>();
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
                [CreateTitleContext, title],
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
