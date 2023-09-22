import OptionTypeBase, { GroupBase, OptionProps } from 'react-select';

export interface IAddProject {
    projectName: string;
    projectDescription: string;
    teamName: string;
    projectMembers: string[];
    projectStartDate: Date;
    projectEndDate: Date;
  }
  
export interface IOption extends OptionTypeBase {
    value: string;
    label: string;
    role: string;
}

export type CustomOptionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
    innerProps: React.HTMLProps<HTMLDivElement>;
    label: string;
   
} & OptionProps<Option, IsMulti, Group>;
  
  