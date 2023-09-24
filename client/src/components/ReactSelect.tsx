import React from 'react'
import OptionTypeBase, { GroupBase, OptionProps,} from 'react-select'
import { Props } from 'react-select/dist/declarations/src/Select';

export interface IOption extends OptionTypeBase {
    value: string;
    label: string;
    role: string;
}

export type CustomOptionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
    innerProps: React.HTMLProps<HTMLDivElement>;
    label: string;
   
} & OptionProps<Option, IsMulti, Group>;
  

// export type CustomOptionProps<T> = {
//   innerProps: React.HTMLProps<HTMLDivElement>;
//   label: string;
//   data: T;
 
// } & OptionProps<T>;





const CustomOption:React.FC<CustomOptionProps<IOption, false, GroupBase<IOption>>>=(props) => {
    return (
      <div className='flex flex-col bg-neutral-100 focus:bg-red-300 active:bg-red-400 cursor-pointer hover:bg-red-300 ' {...props.innerProps}>
        <div  className='text-md mb-0 pb-0'>{props.label}</div>
        <div className='text-xs pl-2 mt-0 pt-0 opacity-80' >{props.data.role}</div>
      </div>
    );
  };
  
export default CustomOption

