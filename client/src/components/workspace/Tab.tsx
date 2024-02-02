import { DragEventHandler, useContext, useState } from 'react';
import { DragContext } from './workspaceContexts';
import DropTarget from './DropTarget';

function Tab<T>({
    value,
    onRemove,
    onInsertBefore,
    onClick,
    title,
    selected,
}: {
    value: T;
    onRemove: () => void;
    onInsertBefore: (value: T) => void;
    onClick: () => void;
    title: string;
    selected: boolean;
}) {
    const [[dragging], setDragging] = useContext(DragContext) as DragContext<T>;

    const [draggingSelf, setDraggingSelf] = useState(false);

    const handleDragStart: DragEventHandler = event => {
        event.dataTransfer.setData('text/custom', 'dummy data');
        event.dataTransfer.dropEffect = 'move';
        setDraggingSelf(true);
        setDragging([
            value,
            () => {
                onRemove();
                handleDragEnd();
            },
        ]);
    };

    const handleDragEnd = () => {
        setDraggingSelf(false);
        setDragging([undefined, undefined]);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // drop is triggered before dragEnd
            onClick={onClick}
            className={`relative -my-px -ml-px min-w-32 cursor-pointer select-none border border-black px-3 py-1 ${selected ? 'bg-neutral-200' : 'text-neutral-500'} flex flex-row items-center gap-2`}>
            {dragging && (
                <DropTarget
                    disabled={draggingSelf}
                    onDrop={onInsertBefore}
                    className='absolute inset-0'
                />
            )}
            {title}
            <button onClick={onRemove}>x</button>
        </div>
    );
}

export default Tab;
