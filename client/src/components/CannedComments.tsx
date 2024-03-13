import { Dispatch } from 'react';
import { CommentValues } from 'requests';
import Select from 'react-select'

const commentOptions: {
    value: CommentValues;
    label: string;
}[] = [
    { label: 'great driving', value: 'great_driving' },
    { label: 'good driving', value: 'good_driving' },
    { label: 'source only', value: 'source_only' },
    { label: 'clogging', value: 'clogging' },
    { label: 'effective defense', value: 'effective_defense' },
    { label: 'mid defense', value: 'mid_defense' },
    { label: 'ineffective defense', value: 'ineffective_defense' },
    { label: 'sturdy build', value: 'sturdy_build' },
    { label: 'weak build', value: 'weak_build' },
    { label: 'drives under stage', value: 'drives_under_stage' },
    { label: 'avoids under stage', value: 'avoids_under_stage' },
];

function CannedCommentBox({
    value,
    onChange,
}: {
    value?: CommentValues[] | undefined;
    onChange?: Dispatch<CommentValues[]>;
}) {
    return (
        <div className='contents'>

            <Select
                closeMenuOnSelect={false}
                // defaultValue={[colourOptions[0], colourOptions[1]]}
                isMulti
                value={value}
                
                options={commentOptions as unknown as CommentValues[]}
                
                onChange={value => onChange?.(value as CommentValues[])}
                // styles={colourStyles}
            />
        </div>
    );
}

export default CannedCommentBox;

{
    /*
mapping SelectSearchOption to a strings for each one

but, can't use .map on a single option (which this could be) 

onchange grabs a value, and you can give it a function to do something with that value
need to set value to a string in order to set it to the state (and to use it in other places?)

set values to string before map?

if standalone, do x
if multiple/array, do y


how this works:
line 26
takes in value, which is SelectedOption value - a string or string array, then assigns it to an array, and then maps (splits and individually assigns) 
each element in that array to be a string, if it wasn't already, so we went up with an array of strings.

the onChange we passed in was expecting type string[], so that checks out

in SuperTeam, we set 


*/
}
