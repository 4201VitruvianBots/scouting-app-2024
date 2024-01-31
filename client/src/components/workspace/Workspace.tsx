import {
    Dispatch,
    FunctionComponent,
    MutableRefObject,
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
    children: FunctionComponent<StateProps<T>>;
    title: (value: T) => string;
    className?: string;
}) {
    const { dragging, setDragging, changeActiveTab } = controls;

    return (
        <MultiContext
            contexts={[
                [TabChildContext, children],
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

const TabChildContext = createContext<FunctionComponent<StateProps<unknown>>>(
    () => undefined
);

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
    TabChildContext,
    SetDraggingContext,
    ChangeActiveTabContext,
    CreateTitleContext,
};
