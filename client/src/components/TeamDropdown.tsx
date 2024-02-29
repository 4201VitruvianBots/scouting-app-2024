import { Dispatch } from 'react';
import teamsString from '../assets/teams.txt?raw';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

const teamOptions: SelectSearchOption[] = teamsString
    .split('\n')
    .filter(e => e !== '')
    .map(e => ({ name: e, value: e }));

function TeamDropdown({
    value,
    onChange,
}: {
    value?: number | undefined;
    onChange?: Dispatch<number>;
}) {
    return (
        <SelectSearch
            options={teamOptions}
            value={value?.toString()}
            onChange={value => onChange?.(parseInt(value as string))}
            search
            placeholder='Select Team Number...'
        />
    );
}

export default TeamDropdown;
