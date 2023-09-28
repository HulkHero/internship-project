import OptionTypeBase, { StylesConfig } from 'react-select';

interface OptionType extends OptionTypeBase {
    label: string;
    value: string;
    role: string;
}

export const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#ff0000' : '#e2e8f0',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#ff0000' : '#e2e8f0',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3182ce' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3182ce' : '#e2e8f0',
        color: state.isSelected ? 'white' : 'black',
      },
    }),
  };