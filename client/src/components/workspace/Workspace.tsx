import { FunctionComponent, createContext } from 'react';
import { PaneData, StateProps } from './workspaceData';
import Pane from './Pane';

function Workspace<T>({
    value,
    onChange,
    children,
    className = '',
}: StateProps<PaneData<T>> & {
    children: FunctionComponent<StateProps<T>>;
    className?: string;
}) {
    return (
        <TabChildContext.Provider
            value={children as FunctionComponent<StateProps<unknown>>}>
            <Pane
                value={value}
                onChange={onChange}
                className={`${className} ${value.type === 'tabs' ? 'p-2' : value.vertical ? 'px-2' : 'py-2'}`}
            />
        </TabChildContext.Provider>
    );
}

const TabChildContext = createContext<FunctionComponent<StateProps<unknown>>>(
    () => undefined
);

export default Workspace;
export { TabChildContext };
