import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../utils/interceptor'

import SmallCard from '../../../components/smallCard'

import OptionTypeBase, { ActionMeta, GroupBase, OptionProps, SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
type Props = {
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
}
interface IOption extends OptionTypeBase {
  value: string;
  label: string;
  role: string;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  techRole: string;
  systemRole: string;
}

  type CustomOptionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
    innerProps: React.HTMLProps<HTMLDivElement>;
    label: string;
   
  } & OptionProps<Option, IsMulti, Group>;

const CustomOption: React.FC<CustomOptionProps<IOption, false, GroupBase<IOption>>> = (props) => {

  return (
    <div className='flex flex-col bg-neutral-100 cursor-pointer hover:bg-red-300 focus:bg-red-300 border-b-2 ' {...props.innerProps}>
      <div  className='text-md mb-0 pb-0'>{props.label}</div>
      <div className='text-xs pl-2 mt-0 pt-0 opacity-80' >{props.data.role}</div>
    </div>
  );
};

const SearchBar = ({handleSubmit}: Props) => {

  const {data:roles,isError,isLoading}=useQuery(['getRoles'],()=>{
    return axiosInstance.get('/kpi/get')
  },{
    select:(data)=>data.data.roles
  })
  const fetchOptions = async (inputValue:string) => {
    try {
      const response = await axiosInstance.get(`/user/search/${inputValue}`);
      console.log(response.data,"response")
      const users = response.data.map((user:User) => ({
        value: user._id,
        label: `${user.firstName}  ${user.techRole}`,
      }));
      // setOptions(users);
      return users;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
//  const onChange = (option:IOption|null, actionMeta: ActionMeta<IOption>) => {
//    setOptions(option);
// }
 
  return (
    <form onSubmit={handleSubmit} >
    <div className='flex flex-wrap max-[400px]:flex-col items-center justify-between max-w-full mx-4 p-2 bg-brightRed rounded-lg'>
        <div className='max-[400px]:my-2 max-[400px]:min-w-[150px]'>
            <AsyncSelect<IOption, false, GroupBase<IOption>>
                components={{ Option: CustomOption }}
                cacheOptions={true}
                // options={{
                //   value: 'all',
                //   label: 'All',
                // }}
                // onChange={onChange}
                name="searchinput"
                isMulti={false}
              
                defaultOptions={[{value:'',label:'Top Performor',role:''} as IOption]}
                loadOptions={fetchOptions}
                classNames={{
                  control: (state) =>state.isFocused ? ' min-w-[150px]  outline-none ' : 'min-w-[150px] outline-none border-grey-300',
                  
                  
                  }}
                />
            <div>
        {/* {options && options.map((option) => (
               <button className='cursor-pointer' onClick={()=>console.log("hello")} > <SmallCard _id={option._id} firstName={option.firstName} lastName={option.lastName} techRole={option.techRole} systemRole={option.systemRole} /> </button>
        ))} */}
        </div>
        </div>
        <div className='max-[400px]:my-2 max-[400px]:min-w-[150px]'>
        <select name="selectType" className="outline-none px-2 py-2 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs ">
                <option value="All">All</option>
                <option value="15Day">15Day</option>
                <option value="30Day">30Day</option>
                <option value="project">Project</option>
           </select> 
        </div>
        <div className='max-[400px]:my-2 max-[400px]:min-w-[150px] '>
        <select name="selectRole" defaultValue={"All"} className="outline-none px-2 py-2 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs ">
                <option value="All" >All</option>
                {
                  roles && roles.map((role:string,index:number)=>{
                    return(
                      <option key={index} value={role}>{role}</option>
                    )
                  })
                }  
           </select> 
        </div>
           <button type="submit" className="btn btn-primary btn-sm">Submit</button>

    </div>
    </form>
  )
}

export default SearchBar