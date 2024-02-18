import { Dispatch, SetStateAction } from 'react';

class SplitData<T extends TabBase> {
    readonly type = 'split';
    readonly vertical: boolean;
    panes: PaneData<T>[];
    sizes: number[];

    constructor(vertical: boolean, ...panes: PaneData<T>[]) {
        this.vertical = vertical;
        this.panes = panes;
        this.sizes = new Array(panes.length).fill(0);
    }

    static Vertical<T extends TabBase>(...panes: PaneData<T>[]) {
        return new SplitData(true, ...panes);
    }

    static Horizontal<T extends TabBase>(...panes: PaneData<T>[]) {
        return new SplitData(false, ...panes);
    }
}

class TabsData<T extends TabBase> {
    readonly type = 'tabs'
    tabs: T[];
    selected = 0;

    constructor(...tabs: T[]) {
        this.tabs = tabs;
    }
}

type PaneData<T extends TabBase> = SplitData<T> | TabsData<T>;

interface StateProps<T> {
    value: T;
    onChange: Dispatch<SetStateAction<T>>;
}

type TabsSplice<T extends TabBase> = (values: (value: TabsData<T>) => TabsData<T>[]) => void;

interface TabBase {
    title: string;
}

export { SplitData, TabsData, type PaneData, type StateProps, type TabsSplice, type TabBase };
