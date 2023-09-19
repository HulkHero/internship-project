import {useState,useEffect} from 'react'
import { Kpi } from './Evaluate'
import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from '../../utils/interceptor'
import RadioInputs from './RadioInputs'
import ProgressBar from './ProgressBar'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
import Modal from '../Modal'
import openModal from '../../utils/handleModal'

interface Props {
    projectId?:string,
    techRole:string,
    employeeId:string,
    type:string
}


const EvaluateCard = ({projectId,techRole,employeeId,type}: Props) => {
    const managerId=useAppSelector(authSelector)._id
    const [index,setIndex]=useState(0)
    const [kpis,setKpis]=useState<Kpi[]>([])
    const [disable,setDisable]=useState(true)
    console.log(employeeId,"employeeId")

  const {data,isLoading,error,isError ,refetch}=useQuery(["kpis",employeeId],()=>{
    return axiosInstance.get(`/kpi/getKpi/${techRole}`)
  },{select:(data)=>data.data.data.kpiFields,
    enabled:!!employeeId,
    refetchInterval:1000*60*60*24,
  })

  const {data:mutation,mutate ,isLoading:mutationLoading,error:mutationError,isError:mutationIsError}=useMutation({
     mutationFn: ()=>{
      return axiosInstance.post(`/evaluation/add`,{
        employeeId,
        managerId,
        projectId,
        kpis,
        type:type
      })
    },
    onSuccess:()=>{
      openModal('success')
     },
    onError:()=>{
    openModal('error')
  }}
  )
   
  useEffect(()=>{
    if(data){
      console.log("newData")
       setKpis(data)
    }
  },[data])

  const handleOptionChange = (selectedValue:string) => {
    console.log('Selected option:', selectedValue);
    kpis[index].kpiScore=Number(selectedValue)
    setDisable(false)
  };

  console.log(kpis,"kpis")
  useEffect(()=>{
    if(kpis.length>0){
      setDisable(true)
    }
  },[index])

  const handleNext=()=>{
     if(index<kpis.length-1){
       if(kpis[index].kpiScore===undefined){
          alert("please select an option")
         return;
       }
       setIndex(index+1)
     }
     else{
        mutate()
        // handleSubmit();
     }
  }


  return (
    <div className='w-full rounded-md md:w-[80%]  mx-auto '>
    {kpis && kpis.length>0 ?<div className=' bg-white rounded-md text-gray-900  h-screen  sm:min-h-[80%] flex flex-col justify-between sm:justify-start sm:h-fit '>
    <div>
    <div className='bg-secondary p-3 shadow-md '>
      <h1 className='text-center text-white text-xl'>Project Base Evaluation</h1>
    </div>
    {/* <TimerProgressbar time={time} initialTime={initialTime}></TimerProgressbar> */}
    <div>
      <div className='bg-white px-3 py-4 border-b-2'>
        <p className='flex flex-col'>
          <span >  {kpis[index].kpiName}</span>
          
          <span className='text-sm text-gray-500'>
            Weightage:{"  "}{kpis[index].kpiWeight}
          </span>
        </p>
      </div>
      <div className='bg-smoke'>
        <RadioInputs index={index}   onChange={handleOptionChange}  />
      </div>
    </div>
    </div> 
    <div>
    <ProgressBar index={index} length={kpis.length}></ProgressBar>
    <div className='w-full'>
      <div className='w-fit ml-auto'>
        <button  disabled={disable} onClick={()=>handleNext()} className='btn btn-primary disabled:bg-red-300 '>{kpis.length-1===index ?"Submit":"Next"}</button>
      </div>
    </div>
   </div> 
   <Modal variant='success' description='evaluation saved successfully' title='Added' linkText='Next' goBack={true}  ></Modal>
    <Modal variant='error' description='Something went wrong' title='Error' linkText='Back' goBack={true}  ></Modal>
  </div> :null}
  </div>
  )
}

export default EvaluateCard