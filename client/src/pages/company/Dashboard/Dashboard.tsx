import React from 'react'
import Stats from './Stats'
import Bar from './Bar'
import GridLayout from './GridLayout'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../../utils/interceptor'


const Dashboard = () => {
  const [searche, setSearche] = React.useState('')
  const [selectType, setSelectType] = React.useState('All')
  const [selectRole, setSelectRole] = React.useState('All')
  // const [searchParams,setSearchParams]=useSearchParams()
  // const searche=searchParams.get('search')||''
  // const selectType=searchParams.get('type')||''
  // const selectRole=searchParams.get('role')||''



  console.log(searche,selectRole,selectType,"hello")
  const {data, isLoading, isError,refetch} = useQuery(['getChart'], () => {
    return axiosInstance.get(`/dashboard/charts?search='${searche}&type=${selectType}&role=${selectRole}`)
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

  // React.useEffect(() => {
  //   console.log(searche)
  //   console.log(selectType)
  
   
  // }, [searche,searchParams])
  
  return (
    <div>
      <div>
        <Stats></Stats>  
      </div>
      <div>
        <Bar handleSubmit={handleSubmit}></Bar>
      </div>
      <div>
        <GridLayout kpis={data.evaluation.kpis}></GridLayout>
      </div>
    </div>
  )
}

export default Dashboard