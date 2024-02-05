import { Dispatch, useState } from 'react';
import { AnalysisEntry, StatTableData } from '../data';
import TextInput from '../../../components/TextInput';
import Select from '../../../components/Select';
import Checkbox from '../../../components/Checkbox';
import { numberColumns } from '../util';

function StatDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<StatTableData>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    const columns = numberColumns(data);

    const [title, setTitle] = useState('');
    const [column, setColumn] = useState<string>();
    const [ascending, setAscending] = useState(false);

    const handleSubmit = () => {
        if (column) {
            onSubmit({ title: title || column, column, ascending, type: 'stat_table' });
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
                        placeholder={column}
                    />
                </label>
            </p>
            <p>
                <label>
                    Column
                    <Select
                        options={columns}
                        value={column}
                        onChange={setColumn}
                        placeholder='Choose column'
                    />
                </label>
            </p>
            <p>
                    <Checkbox onChange={setAscending}>Ascending</Checkbox>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatDialog;
