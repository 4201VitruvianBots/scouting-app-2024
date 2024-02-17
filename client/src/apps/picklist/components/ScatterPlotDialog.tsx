import { Dispatch, useState } from 'react';
import { AnalysisEntry, ScatterPlotGraphData } from '../data';
import TextInput from '../../../components/TextInput';
import SelectSearch from 'react-select-search';

function ScatterPlotDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<ScatterPlotGraphData>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    const columns = data
        ? Object.keys(data[0]).filter(
              e => e !== 'teamNumber' && typeof data[0][e] === 'number'
          )
        : [];

    const [title, setTitle] = useState('');
    const [xColumn, setXColumn] = useState<string>();
    const [yColumn, setYColumn] = useState<string>();

    const handleSubmit = () => {
        if (xColumn && yColumn) {
            onSubmit({
                title: title || (xColumn || '') + ' ' + (yColumn || ''),
                xColumn: xColumn || '',
                yColumn: yColumn || '',
                type: 'ScatterPlotGraph',
            });
            onClose?.();
        }
    };

    return (
        <>
            <label>
                X axis
                <SelectSearch
                    options={columns.map(e => ({ value: e, name: e }))}
                    value={xColumn}
                    placeholder='Select X axis'
                    onChange={value => setXColumn(value as string)}
                    search
                />
            </label>
            <label>
                Y axis
                <SelectSearch
                    options={columns.map(e => ({ value: e, name: e }))}
                    value={yColumn}
                    placeholder='Select Y axis'
                    onChange={value => setYColumn(value as string)}
                    search
                />
            </label>
            <p>
                <label>
                    Title
                    <TextInput
                        value={title}
                        onChange={setTitle}
                        placeholder={(xColumn || "") + " " + (yColumn || "")}
                    />
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default ScatterPlotDialog;
