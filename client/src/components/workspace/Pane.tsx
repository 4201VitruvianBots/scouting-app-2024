import { Dispatch, SetStateAction } from 'react';
import Split from './Split';
import Tabs from './Tabs';
import { PaneData, SplitData, StateProps, TabsData } from './workspaceData';

function stateToPane<T>(
    value: PaneData<T>,
    onChange: Dispatch<SetStateAction<PaneData<T>>>,
    onRemove: () => void
) {
    switch (value.type) {
        case 'split':
            return (
                <Split
                    value={value}
                    onChange={
                        onChange as Dispatch<SetStateAction<SplitData<T>>>
                    }
                />
            );
        case 'tabs':
            return (
                <Tabs
                    value={value}
                    onChange={onChange as Dispatch<SetStateAction<TabsData<T>>>}
                    onRemove={onRemove}
                />
            );
    }
}

function Pane<T>({
    value,
    onChange,
    height,
    width,
    onRemove,
    className = '',
}: {
    height?: number | 'auto';
    width?: number | 'auto';
    onRemove: () => void;
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
            {stateToPane(value, onChange, onRemove)}
        </div>
    );
}

export default Pane;
