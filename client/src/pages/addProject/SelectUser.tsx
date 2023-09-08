import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

// Define the CustomOptionProps interface
interface CustomOptionProps<Option> {
  innerProps: React.HTMLProps<HTMLDivElement>;
  label: string;
  data: Option; // Use Option type here
}

// Use the SelectProps with generics
function CustomOption<Option extends { label: string }>(
  props: CustomOptionProps<Option>
) {
  const { innerProps, label } = props;
  
  return (
    <div {...innerProps}>
      <div className='bg-green-700'>{label}</div>
      {/* Add any additional content you want to render */}
    </div>
  );
}

// Example usage:
const options: Array<{ label: string }> = [{ label: 'Option 1' }, { label: 'Option 2' }];

const SelectUser = () => {
  return (
    <Select
      components={{ Option: CustomOption }}
      options={options}
    />
  );
}

export default SelectUser;
