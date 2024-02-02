import { Dispatch, Fragment, useEffect, useRef } from 'react';
import { useArrayState } from '../../lib/useArrayState';
import { usePropState } from '../../lib/usePropState';
import Pane from './Pane';
import ResizeHandle from './ResizeHandle';
import {
    PaneData,
    SplitData,
    StateProps,
    TabsData,
    TabsSplice,
} from './workspaceData';

function Split<T>({ value, onChange }: StateProps<SplitData<T>>) {
    const divRef = useRef<HTMLDivElement>(null);

    const [sizes, setSizes] = usePropState(value, onChange, 'sizes');
    const [panes, setPanes] = usePropState(value, onChange, 'panes');
    const sizesA = useArrayState(setSizes);
    const panesA = useArrayState(setPanes);

    useEffect(() => {
        setSizes(new Array(panes.length).fill(1 / panes.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panes.length]);

    useEffect(() => {
        // If there is less than one remaining
        if (panes.length <= 1) {
            (onChange as Dispatch<PaneData<T>>)(panes[0]);
            return;
        }
    }, [onChange, panes]);

    const handleResize = (index: number) => (size: number) => {
        const newSize =
            size /
            (value.vertical
                ? divRef.current!.offsetHeight
                : divRef.current!.offsetWidth);
        sizesA.set(index, newSize);
        if (index < sizes.length)
            sizesA.set(index + 1, sizes[index] + sizes[index + 1] - newSize);
    };

    const handleSplice =
        (i: number): TabsSplice<T> =>
        values => {
            setPanes(panes => [
                ...panes.slice(0, i),
                ...values(panes[i] as TabsData<T>),
                ...panes.slice(i + 1),
            ]);
        };

    return (
        <div
            ref={divRef}
            className={`flex h-full w-full ${value.vertical ? 'flex-col overflow-y-hidden' : 'flex-row overflow-x-hidden'} *:flex-shrink-0`}>
            {panes.map((pane, i) => (
                <Fragment key={i}>
                    <Pane
                        value={pane}
                        onChange={newPane => panesA.set(i, newPane)}
                        onRemove={() => panesA.remove(i)}
                        {...{
                            [value.vertical ? 'height' : 'width']: sizes[i],
                            [value.vertical
                                ? 'onReplaceVert'
                                : 'onReplaceHoriz']: handleSplice(i),
                        }}
                    />
                    {i + 1 === panes.length || (
                        <ResizeHandle
                            size={
                                sizes[i] *
                                ((value.vertical
                                    ? divRef.current?.offsetHeight
                                    : divRef.current?.offsetWidth) ?? 0)
                            }
                            onResize={handleResize(i)}
                            vertical={value.vertical}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
}

export default Split;
