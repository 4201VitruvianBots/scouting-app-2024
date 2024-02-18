import { ResizeType } from './useWorkspaceState';

import { createContext, Dispatch, SetStateAction, ReactNode } from 'react';


type TabContentContext<T> = (value: T, onChange: Dispatch<SetStateAction<T>>) => ReactNode;
const TabContentContext = createContext<
    TabContentContext<unknown>
>(() => undefined);

const ResizeContext = createContext<Dispatch<SetStateAction<ResizeType>>>(
    () => { }
);

type DragContext<T> = [
    [T, () => void] | [undefined, undefined],
    Dispatch<SetStateAction<[T, () => void] | [undefined, undefined]>>
];
const DragContext = createContext<DragContext<unknown>>([
    [undefined, undefined],
    () => { },
]);

type SetAddToFocusedContext<T> = Dispatch<() => Dispatch<T>>
const SetAddToFocusedContext = createContext<SetAddToFocusedContext<unknown>>(
    () => { }
);

const NestingContext = createContext(0);

export { TabContentContext, ResizeContext, DragContext, SetAddToFocusedContext, NestingContext }
