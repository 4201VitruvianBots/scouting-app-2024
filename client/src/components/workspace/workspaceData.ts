import { Dispatch, SetStateAction } from 'react';

class SplitData<T> {
    readonly type = 'split';
    readonly vertical: boolean;
    panes: PaneData<T>[];
    sizes: number[];

    constructor(vertical: boolean, ...panes: PaneData<T>[]) {
        this.vertical = vertical;
        this.panes = panes;
        this.sizes = new Array(panes.length - 1).fill(0);
    }

    static Vertical<T>(...panes: PaneData<T>[]) {
        return new SplitData(true, ...panes);
    }

    static Horizontal<T>(...panes: PaneData<T>[]) {
        return new SplitData(false, ...panes);
    }
}

class TabsData<T> {
    readonly type = 'tabs'
    tabs: T[];

    constructor(...tabs: T[]) {
        this.tabs = tabs;
    }
}

type PaneData<T> = SplitData<T> | TabsData<T>;

interface StateProps<T> {
    value: T;
    onChange: Dispatch<SetStateAction<T>>;
}

export { SplitData, TabsData, type PaneData, type StateProps };
