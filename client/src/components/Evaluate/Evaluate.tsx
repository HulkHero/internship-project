import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import axiosInstance from '../../utils/interceptor';
import EvaluateCard from './EvaluateCard';


export interface Kpi {
  kpiName:string,
  kpiWeight:number,
  kpiThreshold:number,
  kpiScore:number,
}


const Evaluate = () => {
  const projectId=useParams()._id;
  const [searchParams,setSearchParams]=useSearchParams()
  const userId=searchParams.get("userId")
  const techRole=searchParams.get("techRole")


    
  const [index,setIndex]=React.useState(0)
  const [kpis,setKpis]=React.useState<Kpi[]>([])

  const {data,isLoading,error,isError}=useQuery(["kpis",projectId],()=>{
    return axiosInstance.get(`/kpi/getKpi/${techRole}`)
  },{select:(data)=>data.data.data.kpiFields})

  useEffect(()=>{
    if(data){
       setKpis(data)
    }
  },[data])
  return (
    <>
    <div className="p-3">
    <div className="text-center text-2xl font-bold">Evaluate</div>
    {kpis && kpis.length>0 &&
    <div><div>
        <EvaluateCard projectId={projectId||""}  employeeId={userId||""} techRole={techRole||""}/>
    </div>
   
    </div>
}
    </div>
    </>
  )
}

export default Evaluate