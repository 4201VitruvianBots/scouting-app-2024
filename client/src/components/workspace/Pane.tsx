import { Dispatch, SetStateAction, useContext } from 'react';
import Split from './Split';
import Tabs from './Tabs';
import {
    PaneData,
    SplitData,
    StateProps,
    TabBase,
    TabsData,
    TabsSplice,
} from './workspaceData';
import { NestingContext } from './workspaceContexts';

function Pane<T extends TabBase>({
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
    const nesting = useContext(NestingContext);

    return (
        <NestingContext.Provider value={nesting + 1}>
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
                        onChange={
                            onChange as Dispatch<SetStateAction<TabsData<T>>>
                        }
                        {...{ onRemove, onReplaceHoriz, onReplaceVert }}
                    />
                )}
            </div>
        </NestingContext.Provider>
    );
}

export default Pane;
