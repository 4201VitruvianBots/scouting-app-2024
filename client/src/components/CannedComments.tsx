import { Dispatch } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

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
}) 

{
    return (<div className='contents'>
        <SelectSearch
            options={commentOptions}
            multiple
            value={value}
          
            onChange={value => onChange?.((value as string[]).map(optionValue => optionValue.toString()))}
            search
            placeholder='Select Team Number...'
       />
       </div>
    );
}

export default CannedCommentBox;

{/*
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


*/}
