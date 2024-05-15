import { Dispatch } from 'react';
import teamsString from '../assets/teams.txt?raw';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

('select-search-container');

const teamOptions: SelectSearchOption[] = teamsString
    .split(/\r?\n/g)
    .filter(e => e !== '')
    .map(e => ({ name: e, value: e }));

const teamOptionsWithAbsent: SelectSearchOption[] = [
    { value: '0', name: 'Absent' },
    ...teamOptions,
];

function TeamDropdown({
    value,
    onChange,
    disabledOptions,
    allowAbsent = false,
}: {
    value?: number | undefined;
    onChange?: Dispatch<number>;
    disabledOptions?: number[];
    allowAbsent?: boolean;
}) {
    const options = allowAbsent ? teamOptionsWithAbsent : teamOptions;
    const optionsWithDisabled = disabledOptions
        ? options.map(e => ({
              ...e,
              disabled: disabledOptions.includes(parseInt(e.value as string)),
          }))
        : options;

    return (
        <div className='team-search mx-auto contents '>
            <SelectSearch
                options={optionsWithDisabled}
                value={value?.toString()}
                onChange={value => onChange?.(parseInt(value as string))}
                search
                placeholder='Select Team Number...'
            />
        </div>
    );
}

export default TeamDropdown;
