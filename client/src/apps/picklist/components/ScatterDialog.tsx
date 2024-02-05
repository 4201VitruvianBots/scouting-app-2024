import { Dispatch, useState } from 'react';
import { AnalysisEntry, ScatterPlotData } from '../data';
import TextInput from '../../../components/TextInput';
import Select from '../../../components/Select';
import { numberColumns } from '../util';

function ScatterDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<ScatterPlotData>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    const columns = numberColumns(data);

    const [title, setTitle] = useState('');
    const [xColumn, setXColumn] = useState<string>();
    const [yColumn, setYColumn] = useState<string>();

    const placeholderTitle = (xColumn && yColumn) ? `${xColumn} & ${yColumn}` : '';

    const handleSubmit = () => {
        if (xColumn && yColumn) {
            onSubmit({ title: title || placeholderTitle, xColumn, yColumn, type: 'scatter_plot' });
            onClose?.();
        }
    };

    return (
        <>
            <p>
                <label>
                    Title
                    <TextInput
                        value={title}
                        onChange={setTitle}
                        placeholder={placeholderTitle}
                    />
                </label>
            </p>
            <p>
                <label>
                    X Column
                    <Select
                        options={columns}
                        value={xColumn}
                        onChange={setXColumn}
                        placeholder='Choose column'
                    />
                </label>
            </p>
            <p>
                <label>
                    Y Column
                    <Select
                        options={columns}
                        value={yColumn}
                        onChange={setYColumn}
                        placeholder='Choose column'
                    />
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default ScatterDialog;
