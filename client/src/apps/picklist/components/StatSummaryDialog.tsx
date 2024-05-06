import { Dispatch, useState } from 'react';
import { AnalysisEntry, StatSummaryData } from '../data';
import TextInput from '../../../components/TextInput';
import SelectSearch from 'react-select-search';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { MaterialSymbol } from 'react-material-symbols';

function StatSummaryDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<StatSummaryData>;
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

    const handleSubmit = () => {
        if (column) {
            onSubmit({
                title: title || camelToSpaced(column || ''),
                column,
                type: 'StatSummary',
            });
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
                    options={columns.map(e => ({
                        value: e,
                        name: camelToSpaced(e),
                    }))}
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
                        placeholder={camelToSpaced(column || '')}
                        className='p-1'
                    />
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatSummaryDialog;
