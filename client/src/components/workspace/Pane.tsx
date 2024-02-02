import { Dispatch, SetStateAction } from 'react';
import Split from './Split';
import Tabs from './Tabs';
import {
    PaneData,
    SplitData,
    StateProps,
    TabsData,
    TabsSplice,
} from './workspaceData';

function Pane<T>({
    value,
    onChange,
    height,
    width,
    onRemove,
    className = '',
    onReplaceHoriz,
    onReplaceVert,
}: {
    height?: number;
    width?: number;
    onRemove: () => void;
    className?: string;
    onReplaceHoriz?: TabsSplice<T>;
    onReplaceVert?: TabsSplice<T>;
} & StateProps<PaneData<T>>) {
    return (
        <div
            className={className}
            style={
                height !== undefined
                    ? { height: `${100 * height}%` }
                    : width !== undefined
                      ? { width: `${100 * width}%` }
                      : undefined
            }>
            {value.type === 'split' ? (
                <Split
                    value={value}
                    onChange={
                        onChange as Dispatch<SetStateAction<SplitData<T>>>
                    }
                />
            ) : (
                <Tabs
                    value={value}
                    onChange={onChange as Dispatch<SetStateAction<TabsData<T>>>}
                    {...{ onRemove, onReplaceHoriz, onReplaceVert }}
                />
            )}
        </div>
    );
}

export default Pane;
