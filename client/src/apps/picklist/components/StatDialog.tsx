import { Dispatch, useState } from 'react';
import { AnalysisEntry, SimpleTable } from '../data';
import TextInput from '../../../components/TextInput';
import Select from '../../../components/Select';
import Checkbox from '../../../components/Checkbox';

function StatDialog({
    onSubmit,
    data,
}: {
    onSubmit: Dispatch<SimpleTable>;
    data: AnalysisEntry[];
}) {
    const columns = Object.keys(data[0]).filter(
        e => e !== 'teamNumber' && typeof data[0][e] === 'number'
    );

    const [title, setTitle] = useState('');
    const [column, setColumn] = useState<string>();
    const [ascending, setAscending] = useState(false);

    const handleSubmit = () => {
        if (column) {
            onSubmit({ title: title || column, column, ascending });
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
                <label>
                    <Checkbox value={ascending} onChange={setAscending} />
                    Ascending
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatDialog;
