import React from 'react'
import Stats from './Stats'

import GridLayout from './GridLayout'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../../utils/interceptor'
import { Evaluation, Kpis, TopEmployee } from './types'
import TopPerformer from './TopPerformer'
import { AxiosError } from 'axios'
import SearchBar from './SearchBar'
import Bar from './Managers/Bar'



const Dashboard = () => {
  const [searche, setSearche] = React.useState('')
  const [selectType, setSelectType] = React.useState('All')
  const [selectRole, setSelectRole] = React.useState('All')
  console.log(searche,selectRole,selectType,"hello")

  const {data, isLoading, isError,error,refetch} = useQuery(['getChart',searche,selectRole,selectType], () => {
    return axiosInstance.get(`/dashboard/charts?search=${searche}&type=${selectType}&role=${selectRole}`)
  }, {
    select: (data) => data.data.data
  })

  console.log(data,"datachart")
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
  
     setSearche(formData.get("searchinput") as string);
     setSelectType(formData.get("selectType") as string);
     setSelectRole(formData.get("selectRole") as string);
  }
  React.useEffect(() => {
    console.log(searche,selectType,selectRole,"hi")
    refetch()

  }, [searche,selectType,selectRole])

  return (
    <div className='bg-neutral-100'>
      <div>
        <Stats></Stats>  
      </div>
      <div className='my-2'>
        <Bar></Bar>
      </div>
      <div>
        <SearchBar handleSubmit={handleSubmit}></SearchBar>
      </div>
      <div>
        {data && searche==="" && <TopPerformer topPerfomer={true} firstName={data.firstName} lastName={data.lastName} techRole={data.techRole} systemRole={data.systemRole} averageScore={data.averageScore} ></TopPerformer>}
        {data && searche!=="" && <TopPerformer topPerfomer={false} firstName={data.firstName} lastName={data.lastName} techRole={data.techRole} systemRole={data.systemRole} averageScore={data.averageScore} ></TopPerformer>}
      </div>
      <div>
        {isLoading?<div>Loading...</div>
        :isError?  (
          <div>Error: {error instanceof AxiosError? error.response?.data.msg :"Something Went Wrong"}</div>
        ) 
         :data ? <GridLayout evaluation={data.evaluation as Evaluation[]}></GridLayout>:<div>no evaluations found</div>}
   
      </div>
    </div>
  )
}

export default Dashboard