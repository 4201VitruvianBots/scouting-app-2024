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
    onClick,
    title,
    selected,
}: {
    value: T;
    onRemove: () => void;
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
        if (dragging !== 'content' && dragTarget) setDragTarget(false);
    }, [dragTarget, dragging]);

    const handleDragStart: DragEventHandler = event => {
        event.dataTransfer.setData('text/custom', 'dummy data');
        event.dataTransfer.dropEffect = 'move';
        setDraggingSelf(true);
        setDragging(value);
    };

    const handleDragEnd: DragEventHandler = event => {
        // if (event.dataTransfer.dropEffect) ;
        setDraggingSelf(false);
        setDragging(undefined);
    };

    const handleDragEnter: DragEventHandler = event => {
        if (draggingSelf) return;
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragExit: DragEventHandler = () => {
        if (draggingSelf) return;
        setDragTarget(false);
    };

    const handleDragOver: DragEventHandler = event => {
        if (draggingSelf) return;
        event.preventDefault();
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragExit={handleDragExit}
            onClick={onClick}
            className={`cursor-pointer select-none border-r border-black px-2 py-1 ${selected ? '' : 'text-neutral-500'} ${dragTarget ? 'bg-green-500' : ''}`}>
            {title}
        </div>
    );
}

export default Tab;
