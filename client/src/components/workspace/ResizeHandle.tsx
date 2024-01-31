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
    const handleMouseDown: MouseEventHandler = event => {
        const initial = vertical ? event.clientY : event.clientX;

        const handleMouseMove = (event: MouseEvent) => {
            onResize(
                size + (vertical ? event.clientY : event.clientX) - initial
            );
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
            className={`${vertical ? 'cursor-ns-resize py-2' : 'cursor-ew-resize px-2'}`}
            onMouseDown={handleMouseDown}>
            <div
                className={`${vertical ? 'h-px w-full' : 'h-full w-px'} bg-black`}
            />
        </div>
    );
}

export default ResizeHandle;
