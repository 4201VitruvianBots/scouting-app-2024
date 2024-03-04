import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';

function Dialog({
    open: openProp,
    trigger,
    children,
}: {
    open?: boolean;
    trigger: (open: () => void) => ReactNode;
    children: ReactNode | ((close: () => void) => ReactNode);
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [open, setOpen] = useState(openProp);

    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);

    useEffect(() => {
        if (open === dialogRef.current?.open) return;

        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    const handleClick: MouseEventHandler<HTMLDialogElement> = ({currentTarget, clientX, clientY}) => {
        const { left, right, top, bottom } = currentTarget.getBoundingClientRect();
        
        if (clientX > left && clientX < right && clientY > top && clientY < bottom) return;

        setOpen(false);
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={() => setOpen(false)}
                onClick={handleClick}
                className='overflow-visible rounded-md bg-gray-100 p-5'>
                {open &&
                    (typeof children === 'function'
                        ? children(() => setOpen(false))
                        : children)}
            </dialog>
            {trigger(() => setOpen(true))}
        </>
    );
}

export default Dialog;
