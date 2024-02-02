import { Dispatch, Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import { useArrayState } from '../../lib/useArrayState';
import { usePropState } from '../../lib/usePropState';
import Pane from './Pane';
import ResizeHandle from './ResizeHandle';
import { PaneData, SplitData, StateProps } from './workspaceData';

function Split<T>({ value, onChange }: StateProps<SplitData<T>>) {
    const divRef = useRef<HTMLDivElement>(null);

    const [sizes, setSizes] = usePropState(value, onChange, 'sizes');
    const [panes, setPanes] = usePropState(value, onChange, 'panes');
    const sizesA = useArrayState(setSizes);
    const panesA = useArrayState(setPanes);

    const lastPane = panes.at(-1);
    const otherPanes = panes.slice(0, panes.length - 1);

    useLayoutEffect(() => {
        if (!divRef.current) return;
        setSizes(
            new Array(sizes.length).fill(
                (value.vertical
                    ? divRef.current.offsetHeight
                    : divRef.current.offsetWidth) / panes.length
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // If there is less than one remaining
        if (panes.length <= 1) {
            (onChange as Dispatch<PaneData<T>>)(panes[0]);
            return;
        }
    }, [onChange, panes]);

    return (
        <div
            ref={divRef}
            className={`flex h-full w-full ${value.vertical ? 'flex-col' : 'flex-row'} *:flex-shrink-0`}>
            {otherPanes.map((pane, i) => (
                <Fragment key={i}>
                    <Pane
                        value={pane}
                        onChange={newPane => panesA.set(i, newPane)}
                        onRemove={() => panesA.remove(i)}
                        {...{ [value.vertical ? 'height' : 'width']: sizes[i] }}
                    />
                    <ResizeHandle
                        size={sizes[i]}
                        onResize={newSize => sizesA.set(i, newSize)}
                        vertical={value.vertical}
                    />
                </Fragment>
            ))}
            {lastPane && (
                <Pane
                    value={lastPane}
                    {...{ [value.vertical ? 'height' : 'width']: 'auto' }}
                    onChange={newPane => panesA.set(panes.length - 1, newPane)}
                    onRemove={() => panesA.remove(panes.length - 1)}
                />
            )}
        </div>
    );
}

export default Split;
