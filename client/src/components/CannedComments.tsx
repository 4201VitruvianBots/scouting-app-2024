import { Dispatch } from 'react';
import { CommentValues } from 'requests';
import chroma from 'chroma-js';
// import { ColourOption, colourOptions } from '../data';
import Select, { StylesConfig } from 'react-select';

export interface SelectOption<T> {
    value: T;
    label: string;
    color: string;
}

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const commentOptions: SelectOption<CommentValues>[] = [
    { label: 'great driving', value: 'great_driving', color: '#1193ab'},
    { label: 'good driving', value: 'good_driving', color: '#1193ab' },
    { label: 'source only', value: 'source_only', color: '#8200d9' },
    { label: 'clogging', value: 'clogging', color: '#d98d00' },
    { label: 'effective defense', value: 'effective_defense', color: '#0052CC' },
    { label: 'okay defense', value: 'okay_defense', color: '#0052CC' },
    { label: 'ineffective defense', value: 'ineffective_defense', color: '#0052CC' },
    { label: 'sturdy build', value: 'sturdy_build', color: '#00d982' },
    { label: 'weak build', value: 'weak_build', color: '#00d982' },
    { label: 'avoids under stage', value: 'avoids_under_stage', color: '#d90000' },
];


const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };




function CannedCommentBox({
    value,
    onChange,
}: {
    value?: SelectOption<CommentValues>[] | undefined;
    onChange?: Dispatch<SelectOption<CommentValues>[]>;
}) {
    return (
        <div className='contents'>

            <Select
                closeMenuOnSelect={false}
                defaultValue={[commentOptions[3], commentOptions[3]]}
                isMulti
                value={value}
                options={commentOptions}
                onChange={value => onChange?.(value as SelectOption<CommentValues>[])}
                className='max-w-[70%] m-2 absolute text-xl '
                styles={colourStyles}
            />
        </div>
    );
}

export default CannedCommentBox;