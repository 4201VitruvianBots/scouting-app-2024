import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { PaneData, StateProps } from './workspaceData';
import Pane from './Pane';
import { DragContext, WorkspaceControls } from './useWorkspaceState';
import MultiContext from '../../lib/MultiContext';
import {
    TabContentContext,
    ResizeContext,
    AddToFocusedContext,
    CreateTitleContext,
} from './useWorkspaceState';

function Workspace<T>({
    value,
    onChange,
    controls,
    children,
    title,
    className = '',
}: StateProps<PaneData<T>> & {
    controls: WorkspaceControls<T>;
    children: (value: T, onChange: Dispatch<SetStateAction<T>>) => ReactNode;
    title: (value: T) => string;
    className?: string;
}) {
    const { addToFocused } = controls;

    const [resizeType, setResizeType] = useState<T>();
    const [dragging, setDragging] = useState<T>();

    return (
        <MultiContext
            contexts={[
                // THIS PART IS NOT TYPECHECKED! CHECK CAREFULLY!
                [TabContentContext, children],
                [ResizeContext, setResizeType],
                [DragContext, [dragging, setDragging]],
                [AddToFocusedContext, addToFocused],
                [CreateTitleContext, title],
            ]}>
            <Pane
                value={value}
                onChange={onChange}
                className={`${className} ${resizeType === 'vertical' ? 'cursor-ns-resize select-none' : resizeType === 'horizontal' ? 'cursor-ew-resize select-none' : ''}`}
                onRemove={() => {
                    /*TODO*/
                }}
            />
        </MultiContext>
    );
}

export default Workspace;
