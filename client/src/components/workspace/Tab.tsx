import {
    Dispatch,
    DragEventHandler,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { DragContext } from './useWorkspaceState';

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
    const [dragTarget, setDragTarget] = useState(false);

    useEffect(() => {
        if (!dragging && dragTarget) setDragTarget(false);
    }, [dragTarget, dragging]);

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

    const handleDragEnter: DragEventHandler = event => {
        if (draggingSelf || !dragging) return;
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragExit: DragEventHandler = () => {
        if (draggingSelf) return;
        setDragTarget(false);
    };

    const handleDragOver: DragEventHandler = event => {
        if (draggingSelf || !dragging) return;
        event.preventDefault();
    };

    const handleDrop: DragEventHandler = () => {
        if (dragging) {
            onInsertBefore(dragging);
        }
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragExit={handleDragExit}
            onDrop={handleDrop}
            // drop is triggered before dragEnd
            onClick={onClick}
            className={`cursor-pointer select-none border-r border-black px-2 py-1 ${selected ? '' : 'text-neutral-500'} ${dragTarget ? 'bg-green-500' : ''}`}>
            {title}
        </div>
    );
}

export default Tab;
