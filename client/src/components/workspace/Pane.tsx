import { Dispatch, SetStateAction } from 'react';
import Split from './Split';
import Tabs from './Tabs';
import { PaneData, SplitData, StateProps, TabsData } from './workspaceData';

function stateToPane<T>(
    value: PaneData<T>,
    onChange: Dispatch<SetStateAction<PaneData<T>>>
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
                />
            );
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
            className={`${className} ${height === 'auto' || width === 'auto' ? 'flex-grow' : ''} overflow-auto`}
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
