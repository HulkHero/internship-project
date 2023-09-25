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
import { toast } from 'react-toastify'
import CustomButton from '../CustomButton'
import { AxiosError } from 'axios'


interface Props {
    projectId?:string,
    techRole:string,
    employeeId:string,
    type:string
}


const EvaluateCard = ({projectId,techRole,employeeId,type}: Props) => {
    const managerId=useAppSelector(authSelector)._id
    const [index,setIndex]=useState(0)
    const [score,setScore]=useState<number[]>([])
    const [disable,setDisable]=useState(true)
    console.log(employeeId,"employeeId")

  const {data:kpis,isLoading,error,isError}=useQuery(["kpis",employeeId],()=>{
    return axiosInstance.get(`/kpi/getKpi/${techRole}`)
  },{select:(data)=>data.data.data.kpiFields,
    enabled:!!employeeId,
  })

  const {mutate ,isLoading:mutationLoading,}=useMutation({
     mutationFn: ()=>{
      return axiosInstance.post(`/evaluation/add`,{
        employeeId,
        managerId,
        projectId,
        kpis,
        score:score,
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

  const handleOptionChange = (selectedValue:string) => {
    setScore([...score,Number(selectedValue)])
    setDisable(false)
  };
  const handleNext=()=>{
     if(index<kpis.length-1){
       if(score[index]===undefined){
         toast.info("please select an option")
         return;
       }
       setIndex(index+1)
       setDisable(true)
     }
     else{
        mutate()
     }
  }
  return (
    <div className='w-full rounded-md md:w-[80%] shadow-md  mx-auto '>
     {isLoading ?<div className=' w-full h-[80vh] flex items-center justify-center'><span className='loading loading-dots w-[100px]' ></span></div>:
     isError?<div className='w-full flex items-center justify-center'>Error: {error instanceof AxiosError? error?.response?.data.msg:"something went wrong"}</div>:null}
    {kpis && kpis.length>0 ?<div className=' bg-white rounded-md text-gray-900  sm:min-h-[80%] flex flex-col justify-between sm:justify-start sm:h-fit '>
    <div>
    <div className='bg-brightRed p-3 shadow-md '>
      <h1 className='text-center text-white text-xl'>{type==="project"?"Project Base Evaluation":"Time Base Evaluation"}</h1>
    </div>
    <div>
      <div className='bg-white px-3 py-4 border-b-2'>
        <p className='flex flex-col'>
          <span className=' text-lg'>  {kpis[index].kpiName}</span>
          
          <span className='text-md text-gray-500'>
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
      <div className='w-fit pt-0 p-4  ml-auto'>
        <CustomButton type={"button"} text={kpis.length-1===index ?"Submit":"Next"} disabled={disable} isLoading={mutationLoading} onClick={()=>handleNext()} className=' btn-primary'></CustomButton>
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