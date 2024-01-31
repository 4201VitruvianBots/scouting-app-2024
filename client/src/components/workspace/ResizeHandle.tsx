import { MouseEventHandler } from 'react';

function ResizeHandle({
    vertical,
    size,
    onResize,
}: {
    vertical: boolean;
    size: number;
    onResize: (size: number) => void;
}) {
    const handleMouseDown: MouseEventHandler = () => {
        let newSize = size;

        const handleMouseMove = (event: MouseEvent) => {
            newSize += vertical ? event.movementY : event.movementX;
            onResize(newSize);
        };

        const handleMouseUp = () => {
            removeEventListener('mousemove', handleMouseMove);
            removeEventListener('mouseup', handleMouseUp);
        };

        addEventListener('mousemove', handleMouseMove);
        addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`${vertical ? 'h-2 cursor-ns-resize' : 'w-2 cursor-ew-resize'} bg-black`}
            onMouseDown={handleMouseDown}></div>
    );
}

export default ResizeHandle;
