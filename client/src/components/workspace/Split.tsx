import { Fragment } from 'react';
import { useArrayState } from '../../lib/useArrayState';
import { usePropState } from '../../lib/usePropState';
import Pane from './Pane';
import ResizeHandle from './ResizeHandle';
import { SplitData, StateProps } from './workspaceData';

function Split<T>({ value, onChange }: StateProps<SplitData<T>>) {
    const [sizes, setSizes] = usePropState(value, onChange, 'sizes');
    const [panes, setPanes] = usePropState(value, onChange, 'panes');
    const sizesA = useArrayState(sizes, setSizes);
    const panesA = useArrayState(panes, setPanes);

    const lastPane = panes.at(-1)!;
    const otherPanes = panes.slice(0, panes.length - 1);

    return (
        <div
            className={`flex h-full w-full ${value.vertical ? 'flex-col' : 'flex-row'}`}>
            {otherPanes.map((pane, i) => (
                <Fragment key={i}>
                    <Pane
                        value={pane}
                        onChange={newPane => panesA.set(i, newPane)}
                        {...{ [value.vertical ? 'height' : 'width']: sizes[i] }}
                    />
                    <ResizeHandle
                        size={sizes[i]}
                        onResize={newSize => {
                            console.log(newSize);
                            sizesA.set(i, newSize);
                        }}
                        vertical={value.vertical}
                    />
                </Fragment>
            ))}
            <Pane
                value={lastPane}
                {...{ [value.vertical ? 'height' : 'width']: 'auto' }}
                onChange={newPane => panesA.set(panes.length, newPane)}
            />
        </div>
    );
}

export default Split;
