import { DragEventHandler, useContext, useEffect, useState } from 'react';
import { DragContext } from './useWorkspaceState';

function DropTarget<T>({
    disabled = false,
    onDrop,
    className = '',
}: {
    disabled?: boolean;
    onDrop: (value: T) => void;
    className?: string;
}) {
    const dragging = useContext(DragContext)[0] as T;
    const [dragTarget, setDragTarget] = useState(false);

    useEffect(() => {
        if (!dragging && dragTarget) setDragTarget(false);
    }, [dragTarget, dragging]);

    const handleDragEnter: DragEventHandler = event => {
        if (disabled || !dragging) return;
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragExit: DragEventHandler = () => {
        if (disabled) return;
        setDragTarget(false);
    };

    const handleDragOver: DragEventHandler = event => {
        if (disabled || !dragging) return;
        event.preventDefault();
    };

    const handleDrop: DragEventHandler = () => {
        if (dragging) {
            onDrop(dragging);
        }
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragExit={handleDragExit}
            onDrop={handleDrop}
            className={`${dragTarget ? 'bg-neutral-500/50' : ''} ${className}`}
        />
    );
}

export default DropTarget;
