import { Dispatch, useState } from 'react';
import { AnalysisEntry, BarGraphData } from '../data';
import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import SelectSearch from 'react-select-search';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { MaterialSymbol } from 'react-material-symbols';

function BarGraphDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<BarGraphData>;
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

    const [showAll, setShowAll] = useState(true);
    const [top, setTop] = useState('');

    const handleSubmit = () => {
        if (column) {
            onSubmit({
                title: title || camelToSpaced(column || ''),
                column,
                ascending,
                type: 'BarGraph',
                top: parseInt(top),
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
                    />
                </label>
            </p>
            <p>
                <Checkbox checked={showAll} onChange={setShowAll}>
                    Show All?
                </Checkbox>
            </p>
            <p>
                <label>
                    Show Top
                    <TextInput
                        value={top}
                        onChange={setTop}
                        placeholder={''}
                        disabled={showAll}
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

export default BarGraphDialog;
