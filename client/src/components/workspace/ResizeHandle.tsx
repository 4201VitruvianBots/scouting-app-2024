import { MouseEventHandler, useContext } from 'react';
import { ResizeContext } from './useWorkspaceState';

function ResizeHandle({
    vertical,
    size,
    onResize,
}: {
    vertical: boolean;
    size: number;
    onResize: (size: number) => void;
}) {
    const setResizing = useContext(ResizeContext);

    const handleMouseDown: MouseEventHandler = event => {
        setResizing(vertical ? 'vertical' : 'horizontal');

        const initial = vertical ? event.clientY : event.clientX;

        const handleMouseMove = (event: MouseEvent) => {
            onResize(
                size + (vertical ? event.clientY : event.clientX) - initial
            );
        };

        const handleMouseUp = () => {
            removeEventListener('mousemove', handleMouseMove);
            removeEventListener('mouseup', handleMouseUp);
            setResizing(undefined);
        };

        addEventListener('mousemove', handleMouseMove);
        addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`${vertical ? '-my-2 cursor-ns-resize py-2' : '-mx-2 cursor-ew-resize px-2'} z-10`}
            onMouseDown={handleMouseDown}>
            <div
                className={`${vertical ? 'h-px w-full' : 'h-full w-px'} bg-black`}
            />
        </div>
    );
}

export default ResizeHandle;
