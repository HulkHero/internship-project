import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../utils/interceptor'
import { create } from 'domain'
import { createSearchParams, useSearchParams } from 'react-router-dom'

type Props = {
  handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
}

const Bar = ({handleSubmit}: Props) => {
  const [searchParams,setSearchParams]=useSearchParams()
  const {data:roles,isError,isLoading}=useQuery(['getRoles'],()=>{
    return axiosInstance.get('/kpi/get')
  },{
    select:(data)=>data.data.roles
  })

  const handleSubmit2=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setSearchParams({
      search:e.currentTarget.searchinput.value,
      type:e.currentTarget.selectType.value,
      role:e.currentTarget.selectRole.value
    })

  }
 
  return (
    <form onSubmit={handleSubmit} >
    <div className='flex justify-between max-w-full mx-4 p-2 bg-brightRed rounded-lg'>
        <div>
            <div>
            <input
                type='text'
                name="searchinput"
                className='outline-none my pl-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs'
                placeholder='Search...' />
            </div>
        </div>
        <div>
        <select name="selectType" className="outline-none px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs ">
                <option value="All">All</option>
                <option value="15Day">15Day</option>
                <option value="30Day">30Day</option>
                <option value="project">Project</option>
           </select> 
        </div>
        <div>
        <select name="selectRole" defaultValue={"All"} className="outline-none px-2 py-1 rounded-lg ring-1 focus:ring-2 focus:ring-darkRed ring-darkRed w-full max-w-xs ">
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

export default Bar