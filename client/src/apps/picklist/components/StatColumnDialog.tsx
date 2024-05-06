import { Dispatch, useState } from 'react';
import { AnalysisEntry } from '../data';
import SelectSearch from 'react-select-search';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { MaterialSymbol } from 'react-material-symbols';

function StatColumnDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<string>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    const columns = data
        ? Object.keys(data[0]).filter(
              e => e !== 'teamNumber' && typeof data[0][e] === 'number'
          )
        : [];
    columns.push('robotImages');

    const [column, setColumn] = useState<string>();
    const handleSubmit = () => {
        if (column) {
            onSubmit(column);
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

            <label className='font-normal'>
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
            <button className='font-normal' onClick={handleSubmit}>
                Create
            </button>
        </>
    );
}

export default StatColumnDialog;
