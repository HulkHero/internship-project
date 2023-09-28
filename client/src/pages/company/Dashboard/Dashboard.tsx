import React from 'react'
import Stats from './Stats'

import GridLayout from './GridLayout'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../../utils/interceptor'
import { Evaluation,} from './types'
import TopPerformer from './TopPerformer'
import { AxiosError } from 'axios'
import SearchBar from './SearchBar'
import Bar from './Managers/Bar'
import Skeleton from '../../../components/Skeleton'
import { Value } from './SearchBar'


const Dashboard = () => {
  const [searche, setSearche] = React.useState('')
  const [selectType, setSelectType] = React.useState('All')
  const [selectRole, setSelectRole] = React.useState('All')
  const [selectRange, setSelectRange] = React.useState<Value>([null, null])
  console.log(searche,selectRole,selectType,"hello")

  const {data, isLoading, isError,error,refetch} = useQuery(['getChart',searche,selectRole,selectType], () => {
    return axiosInstance.get(`/dashboard/charts?search=${searche}&type=${selectType}&role=${selectRole}&dateRange=${selectRange}`)
  }, {
    select: (data) => data.data.data
  })
  
   console.log(selectRange)
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>,value:Value)=>{
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget);
    //  console.log(formData.get("dateRange"))
    console.log(value)
    setSelectRange(value)
     setSearche(formData.get("searchinput") as string);
     setSelectType(formData.get("selectType") as string);
     setSelectRole(formData.get("selectRole") as string);
  }
  React.useEffect(() => {
    refetch()
  }, [searche,selectType,selectRole,selectRange])

  console.log(data,"dashboard")

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
        {isLoading?<><Skeleton variant="box"></Skeleton>
        <Skeleton variant="4charts"></Skeleton>
                      </>
        :isError?  (
          <div>{error instanceof AxiosError? error.response?.data.msg?error.response.data.msg:error.message :"Something Went Wrong"}</div>
        ) 
         :(<><div>
          {data.evaluation && searche==="" && <TopPerformer topPerfomer={true} firstName={data.firstName} lastName={data.lastName} techRole={data.techRole} systemRole={data.systemRole} averageScore={data.averageScore} ></TopPerformer>}
          {data.evaluation && searche!=="" && <TopPerformer topPerfomer={false} firstName={data.firstName} lastName={data.lastName} techRole={data.techRole} systemRole={data.systemRole} averageScore={data.averageScore} ></TopPerformer>}
          </div> 
          {data.evaluation ? (<GridLayout evaluation={data.evaluation as Evaluation[]}></GridLayout>):<div className='text-center p-5'>No Data Found</div>}</>)}
   
      </div>
    </div>
  )
}

export default Dashboard