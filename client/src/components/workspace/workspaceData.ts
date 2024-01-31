import { Dispatch } from 'react';

class SplitData<T> {
    readonly type = 'split';
    readonly vertical: boolean;
    panes: PaneData<T>[];
    sizes: number[];

    constructor(panes: PaneData<T>[], vertical: boolean) {
        this.vertical = vertical;
        this.panes = panes;
        this.sizes = new Array(panes.length - 1).fill(0);
    }
}

class TabsData<T> {
    readonly type = 'tabs'
    tabs: T[];

    constructor(tabs: T[]) {
        this.tabs = tabs;
    }
}

type PaneData<T> = SplitData<T> | TabsData<T>;

interface StateProps<T> {
    value: T;
    onChange: Dispatch<T>;
}

export { SplitData, TabsData, type PaneData, type StateProps };
