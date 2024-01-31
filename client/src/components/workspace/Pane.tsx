import { Dispatch } from 'react';
import Split from './Split';
import Tabs from './Tabs';
import { PaneData, StateProps } from './workspaceData';

function stateToPane<T>(value: PaneData<T>, onChange: Dispatch<PaneData<T>>) {
    switch (value.type) {
        case 'split':
            return <Split value={value} onChange={onChange} />;
        case 'tabs':
            return <Tabs value={value} onChange={onChange} />;
    }
}

function Pane<T>({
    value,
    onChange,
    height,
    width,
    className = '',
}: {
    height?: number | 'auto';
    width?: number | 'auto';
    className?: string;
} & StateProps<PaneData<T>>) {
    return (
        <div
            className={`${className} ${height === 'auto' || width === 'auto' ? 'flex-grow' : ''}`}
            style={
                typeof height === 'number'
                    ? { height: `${height}px` }
                    : typeof width === 'number'
                      ? { width: `${width}px` }
                      : undefined
            }>
            {stateToPane(value, onChange)}
        </div>
    );
}

export default Pane;
