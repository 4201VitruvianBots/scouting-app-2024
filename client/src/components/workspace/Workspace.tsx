import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
} from 'react';
import { PaneData, StateProps, TabsData } from './workspaceData';
import Pane from './Pane';
import { DragType, WorkspaceControls } from './useWorkspaceState';
import MultiContext from '../../lib/MultiContext';

function Workspace<T>({
    value,
    onChange,
    controls,
    children,
    title,
    className = '',
}: StateProps<PaneData<T>> & {
    controls: WorkspaceControls<T>;
    children: (value: T, onChange: Dispatch<SetStateAction<T>>) => ReactNode;
    title: (value: T) => string;
    className?: string;
}) {
    const { dragging, setDragging, changeActiveTab } = controls;

    return (
        <MultiContext
            contexts={[
                [TabContentContext, children],
                [SetDraggingContext, setDragging],
                [ChangeActiveTabContext, changeActiveTab],
                [CreateTitleContext, title],
            ]}>
            <Pane
                value={value}
                onChange={onChange}
                className={`${className} ${dragging === 'vertical' ? 'cursor-ns-resize select-none' : dragging === 'horizontal' ? 'cursor-ew-resize select-none' : ''}`}
            />
        </MultiContext>
    );
}

const TabContentContext = createContext<
    (value: unknown, onChange: Dispatch<SetStateAction<unknown>>) => ReactNode
>(() => undefined);

const SetDraggingContext = createContext<Dispatch<SetStateAction<DragType>>>(
    () => {}
);

const ChangeActiveTabContext = createContext<
    MutableRefObject<Dispatch<SetStateAction<TabsData<unknown>>> | undefined>
>({ current: undefined });

const CreateTitleContext = createContext<
    (value: unknown, index: number) => string
>((_, index) => `Tab ${index}`);

export default Workspace;
export {
    TabContentContext,
    SetDraggingContext,
    ChangeActiveTabContext,
    CreateTitleContext,
};
