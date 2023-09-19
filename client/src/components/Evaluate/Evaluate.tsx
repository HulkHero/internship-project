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
  const employeeId=searchParams.get("userId")
  const techRole=searchParams.get("techRole")
  const type=searchParams.get("type")

  console.log(projectId,employeeId,techRole,type)
  return (
    <>
    <div className="p-3">
    <div className="text-center text-2xl font-bold">Evaluate</div>
    {type==="project"?
        <EvaluateCard type={type||""} projectId={projectId||""}  employeeId={employeeId||""} techRole={techRole||""}/>
    :<EvaluateCard type={type||""}  employeeId={employeeId||""} techRole={techRole||""}/> }
    </div>
    </>
  )
}

export default Evaluate