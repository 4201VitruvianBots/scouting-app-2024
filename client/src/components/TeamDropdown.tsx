import { Dispatch } from 'react';
import teamsString from '../assets/teams.txt?raw';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

'select-search-container';

const teamOptions: SelectSearchOption[] = teamsString
    .split(/\r?\n/g)
    .filter(e => e !== '')
    .map(e => ({ name: e, value: e }));

console.log(teamOptions);

function TeamDropdown({
    value,
    onChange,
    disabledOptions,
}: {
    value?: number | undefined;
    onChange?: Dispatch<number>;
    disabledOptions?: number[];
}) {
    const options = disabledOptions ? teamOptions.map(e => ({...e, disabled: disabledOptions.includes(parseInt(e.value as string))})) : teamOptions;

    return (<div className='contents team-search mx-auto '>
        <SelectSearch
            options={options}
            value={value?.toString()}
            onChange={value => onChange?.(parseInt(value as string))}
            search
            placeholder='Select Team Number...'
       />
       </div>
    );
}

export default TeamDropdown;
