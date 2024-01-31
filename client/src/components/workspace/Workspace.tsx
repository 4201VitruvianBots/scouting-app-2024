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

function Workspace<T>({
    value,
    onChange,
    controls,
    children,
    className = '',
}: StateProps<PaneData<T>> & {
    controls: WorkspaceControls<T>;
    children: FunctionComponent<StateProps<T>>;
    className?: string;
}) {
    const { dragging, setDragging, changeActiveTab } = controls;

    return (
        <TabChildContext.Provider
            value={children as FunctionComponent<StateProps<unknown>>}>
            <SetDraggingContext.Provider value={setDragging}>
                <ChangeActiveTabContext.Provider
                    value={
                        changeActiveTab as MutableRefObject<
                            Dispatch<SetStateAction<TabsData<unknown>>>
                        >
                    }>
                    <Pane
                        value={value}
                        onChange={onChange}
                        className={`${className} ${dragging === 'vertical' ? 'cursor-ns-resize select-none' : dragging === 'horizontal' ? 'cursor-ew-resize select-none' : ''}`}
                    />
                </ChangeActiveTabContext.Provider>
            </SetDraggingContext.Provider>
        </TabChildContext.Provider>
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

export default Workspace;
export { TabChildContext, SetDraggingContext, ChangeActiveTabContext };
