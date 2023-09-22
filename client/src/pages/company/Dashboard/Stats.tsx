import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../utils/interceptor'

const Stats = () => {

    const {data, isLoading, isError} = useQuery(['stats'], () => {
        return axiosInstance.get('/dashboard/stats')
    }, {
        select: (data) => data.data.data
    })
    console.log(data)
    
  return (
    <div className='flex justify-center gap-20 my-3'>
    {isLoading && <div>Loading...</div>}
    {data &&
    <div className='flex  flex-wrap max-sm:gap-2 justify-center sm:gap-10  md:gap-15 lg:gap-20 my-3'>
  <div className="stats shadow min-w-[200px] bg-gradient-to-r from-fuchsia-600 to-pink-600">
  <div className="stat">
    <div className="stat-title">Total Projects</div>
    <div className="stat-value ">{data.totalProjects}</div>
    <div className="stat-desc">{data.ProjectsThisMonth} projects added this month </div>
  </div>
  </div>
  <div className="stats shadow min-w-[200px] bg-gradient-to-r from-blue-400 to-emerald-400">
  <div className='stat'>
    <div className="stat-title">Total Members</div>
    <div className="stat-value">{data.totalEmployees}</div>
    <div className="stat-desc">{data.unikueRoles.length} unikue roles </div>

   </div>
   </div>
   <div className="stats shadow min-w-[200px] bg-gradient-to-r from-rose-500 to-indigo-700 ">
   <div className='stat'>
    <div className="stat-title">Total Evaluations</div>
    <div className="stat-value">{data.totalEvaluations} </div>
    <div className="stat-desc">{data.EvaluationsThisMonth} evaluations added this month </div>
   </div>
   </div>
</div>}
</div>
  )
}

export default Stats