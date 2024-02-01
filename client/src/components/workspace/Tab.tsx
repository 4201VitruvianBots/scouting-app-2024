import {
    Dispatch,
    DragEventHandler,
    SetStateAction,
    useContext,
    useState,
} from 'react';
import { DragContext } from './useWorkspaceState';
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
    const [dragging, setDragging] = useContext(DragContext) as [
        T | undefined,
        Dispatch<SetStateAction<T | undefined>>,
    ];

    const [draggingSelf, setDraggingSelf] = useState(false);

    const handleDragStart: DragEventHandler = event => {
        event.dataTransfer.setData('text/custom', 'dummy data');
        event.dataTransfer.dropEffect = 'move';
        setDraggingSelf(true);
        setDragging(value);
    };

    const handleDragEnd: DragEventHandler = event => {
        // If successful
        if (event.dataTransfer.dropEffect === 'move') {
            onRemove();
        }
        setDraggingSelf(false);
        setDragging(undefined);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // drop is triggered before dragEnd
            onClick={onClick}
            className={`relative min-w-32 cursor-pointer select-none border border-black px-2 py-1 ${selected ? '' : 'text-neutral-500'}`}>
            {dragging && (
                <DropTarget
                    disabled={draggingSelf}
                    onDrop={onInsertBefore}
                    className='absolute inset-0'
                />
            )}
            {title}
        </div>
    );
}

export default Tab;
