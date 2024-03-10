import { Dispatch } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

'select-search-container';

const commentOptions: SelectSearchOption[] = ([
    {name: 'good vibes', value:'good_vibes'},
    {name: 'good driving', value:'good_driving'},
]);

console.log(commentOptions);

function CannedCommentBox({
    value,
    onChange,
}: {
    value?: string[] | undefined;
    onChange?: Dispatch<string[]>;
}) {
    return (<div className='contents team-search'>
        <SelectSearch
            options={commentOptions}
            multiple={true}
            value={value}
            onChange={value => onChange?.(value)}
            search
            placeholder='Select Team Number...'
       />
       </div>
    );
}

export default CannedCommentBox;
