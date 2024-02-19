import { Dispatch, useState } from 'react';
import { AnalysisEntry, StatTableData } from '../data';
import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import SelectSearch from 'react-select-search';
import camelToSpaced from '../../../lib/camelCaseConvert';
import { MaterialSymbol } from 'react-material-symbols';

function StatDialog({
    onSubmit,
    onClose,
}: {
    onSubmit: Dispatch<StatTableData>;
    onClose?: () => void;
}) {

    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        onSubmit({ title: title || "Stat Table", type: 'StatTable' });
        onClose?.();
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
            <p>
                <label>
                    Title
                    <TextInput
                        value={title}
                        onChange={setTitle}
                        placeholder={"Stat Table"}
                        className="p-1"
                    />
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default StatDialog;
