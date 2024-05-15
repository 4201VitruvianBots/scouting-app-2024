import { Dispatch, useState } from 'react';
import { AnalysisEntry, TeamSummaryData } from '../data';
import TextInput from '../../../components/TextInput';
import SelectSearch from 'react-select-search';
import { MaterialSymbol } from 'react-material-symbols';

function TeamSummaryDialog({
    onSubmit,
    onClose,
    data,
}: {
    onSubmit: Dispatch<TeamSummaryData>;
    onClose?: () => void;
    data: AnalysisEntry[] | undefined;
}) {
    // Get all team numbers from the json data
    const teamNumbers = data?.map(e => e.teamNumber.toString()) ?? [];

    // Sort the team numbers
    teamNumbers.sort((a, b) => Number(a) - Number(b));

    const [title, setTitle] = useState('');
    const [teamNumber, setTeamNumber] = useState<string>();

    const handleSubmit = () => {
        if (teamNumber) {
            onSubmit({
                title: teamNumber
                    ? title || 'Team ' + teamNumber + ' Summary'
                    : '',
                teamNumber: Number(teamNumber),
                type: 'TeamSummary',
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
                Team
                <SelectSearch
                    options={teamNumbers.map(e => ({ value: e, name: e }))}
                    value={teamNumber}
                    placeholder='Select Team'
                    onChange={value => setTeamNumber(value as string)}
                    search
                />
            </label>
            <p>
                <label>
                    Title
                    <TextInput
                        value={title}
                        onChange={setTitle}
                        placeholder={
                            teamNumber
                                ? title || 'Team ' + teamNumber + ' Summary'
                                : ''
                        }
                        className='p-1'
                    />
                </label>
            </p>
            <button onClick={handleSubmit}>Create</button>
        </>
    );
}

export default TeamSummaryDialog;
