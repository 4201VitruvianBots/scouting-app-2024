import { Dispatch, useState } from 'react';
import { AnalysisEntry, StatTableData } from '../data';
import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import SelectSearch from 'react-select-search';
import { MaterialSymbol } from 'react-material-symbols';

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
            onSubmit({ title: title || column, column, ascending, type: 'StatTable'});
            onClose?.();
        }
    };

    return (
        <>
            <div className='flex justify-end'>
                <button
                    onClick={onClose}
                    className='grid aspect-square h-3/4 rounded-full hover:bg-gray-500/50'>
                    <MaterialSymbol icon='close' />
                </button>
            </div>
            
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
                <label>
                    Title
                    <TextInput
                        value={title}
                        onChange={setTitle}
                        placeholder={column}
                        className="p-1"
                    />
                </label>
            </p>
            <p>
                <Checkbox onChange={setAscending} className="p-1"> Ascending</Checkbox>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatDialog;
