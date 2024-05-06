import { ReactNode } from 'react';

function ToggleButton({
    className = '',
    trueClassName = '',
    falseClassName = '',
    children,
    onChange,
    value,
}: {
    className?: string;
    trueClassName?: string;
    falseClassName?: string;
    children?: ReactNode;
    onChange?: (value: boolean) => void;
    value?: boolean;
}) {
    return (
        <button
            className={`${className} ${value ? trueClassName : falseClassName}`}
            onClick={() => onChange?.(!value)}>
            {children}
        </button>
    );
}

export default ToggleButton;
