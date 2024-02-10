import { ReactNode, useEffect, useRef, useState } from 'react';

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
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open]);

    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={() => setOpen(false)}
                className='overflow-visible'>
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
