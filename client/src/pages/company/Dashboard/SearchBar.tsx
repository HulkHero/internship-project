import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../utils/interceptor'
import OptionTypeBase, { GroupBase, OptionProps,} from 'react-select'
import AsyncSelect from 'react-select/async'
import { fetchOptions } from '../../../utils/fetchOptionsDebounce'
import CustomOption from '../../../components/ReactSelect'
type Props = {
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
}
interface IOption extends OptionTypeBase {
  value: string;
  label: string;
  role: string;
}


const SearchBar = ({handleSubmit}: Props) => {

  const {data:roles,isError,isLoading}=useQuery(['getRoles'],()=>{
    return axiosInstance.get('/kpi/get')
  },{
    select:(data)=>data.data.roles
  })




  return (
    <form onSubmit={handleSubmit} >
    <div className='flex flex-wrap max-[400px]:flex-col items-center justify-between max-w-full mx-4 p-2 bg-brightRed rounded-lg'>
        <div className='max-[400px]:my-2 max-[400px]:min-w-[150px]'>
            <AsyncSelect<IOption, false, GroupBase<IOption>>
                components={{ Option: CustomOption }}
                cacheOptions={true}
                name="searchinput"
                isMulti={false}
                defaultOptions={[{value:'',label:'Top Performor',role:''} as IOption]}
                loadOptions={fetchOptions<IOption>}
                classNames={{
                  control: (state) =>state.isFocused ? ' min-w-[150px] max-w-[250px]  outline-none ' : 'min-w-[150px] max-w-[250px] outline-none border-grey-300',
                  }}
                />
            <div>
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
                }{
                  isLoading ?<span className='loading-dots'>Loading</span>
                  :isError?<span className='text-red-500'>Error Fetching Roles</span>
                  :null
                } 
           </select> 
        </div>
           <button type="submit" className="btn btn-primary btn-sm">Submit</button>

    </div>
    </form>
  )
}

export default SearchBar