import {useState,useEffect} from 'react'
import { Kpi } from './Evaluate'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../utils/interceptor'
import RadioInputs from './RadioInputs'
import ProgressBar from './ProgressBar'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
interface Props {
    projectId:string,
    techRole:string,
    employeeId:string
}

const EvaluateCard = ({projectId,techRole,employeeId}: Props) => {
    const managerId=useAppSelector(authSelector)._id
    const [index,setIndex]=useState(0)
    const [kpis,setKpis]=useState<Kpi[]>([])

  const {data,isLoading,error,isError}=useQuery(["kpis",projectId],()=>{
    return axiosInstance.get(`/kpi/getKpi/${techRole}`)
  },{select:(data)=>data.data.data.kpiFields})

  useEffect(()=>{
    if(data){
       setKpis(data)
    }
  },[data])

  const handleOptionChange = (selectedValue:string) => {
    console.log('Selected option:', selectedValue);
    kpis[index].kpiScore=Number(selectedValue)
    // dispatch({type:'ANSWERED',payload:{selectedValue,index}})
  };



  const handleNext=()=>{
     if(index<kpis.length-1){
       setIndex(index+1)
     }
     else{
        console.log("submit")
        handleSubmit();
     }
  }

  const handleSubmit=async()=>{
     axiosInstance.post(`/evaluation/add`,{
      employeeId,
      managerId,
      projectId,
      kpis,
      type:"project"
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    console.log(employeeId,projectId,kpis)
    
  }
  const handlePrev=()=>{
    if(index>0){
      setIndex(index-1)
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
            Weightage {kpis[index].kpiWeight}
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
   {/* <KuizFooter index={index} handleNext={handleNext} handleSkip={handleSkip} state={state}  ></KuizFooter> */}
   {/* <div>
      <button onClick={()=>handlePrev()} >Prev</button>
    </div> */}
    <div className='bg-red-500'>
      <div>
        <button onClick={()=>handleNext()} >{kpis.length-1===index ?"Submit":"Next"}</button>
      </div>
      <button onClick={()=>handleNext()} >Next</button>
    </div>
   </div> 

  </div> :null}
  </div>


     
  )
}

export default EvaluateCard