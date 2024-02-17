import { Dispatch, useState } from 'react';
import { AnalysisEntry, StatTableData } from '../data';
import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import SelectSearch from 'react-select-search';

function StatDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<StatTableData>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    const columns = data
        ? Object.keys(data[0]).filter(
              e => e !== 'teamNumber' && typeof data[0][e] === 'number'
          )
        : [];

    const [title, setTitle] = useState('');
    const [column, setColumn] = useState<string>();
    const [ascending, setAscending] = useState(false);

    const handleSubmit = () => {
        if (column) {
            onSubmit({ title: title || column, column, ascending });
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
            <label>
                Column
                <SelectSearch
                    options={columns.map(e => ({ value: e, name: e }))}
                    value={column}
                    placeholder='Select Stat'
                    onChange={value => setColumn(value as string)}
                    search
                />
            </label>
            <p>
                <Checkbox onChange={setAscending}>Ascending</Checkbox>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatDialog;
