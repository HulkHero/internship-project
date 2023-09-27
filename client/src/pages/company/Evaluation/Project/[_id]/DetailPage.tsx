import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import {useParams,useSearchParams} from "react-router-dom"
import axiosInstance from '../../../../../utils/interceptor'
import MemberCard from './MemberCard'
import { ProjectMember } from './types'
import { AxiosError } from 'axios'
import { useAppSelector } from '../../../../../state/redux/hooks'
import { authSelector } from '../../../../../state/redux/slices/authSlice'


const DetailPage = () => {
  const params=useParams()._id
  const {_id}=useAppSelector(authSelector)

  

  const [inProgress,setInProgress]=React.useState(true)
  const {data,isLoading,error,isError}=useQuery(["projectDetail",params],()=>{
    return axiosInstance.get(`/project/singleProject/${params}`)
  },{select:(data)=>data.data.data})
  
  useEffect(()=>{
  if(data){
    const projectEndDate = new Date(data.projectEndDate);
  if(projectEndDate<new Date()){
    setInProgress(false);
  }}
  },[data])
   


  return (
    <div >
      {
        isLoading?(
          <div className=' w-full h-[80vh] flex items-center justify-center'>
          <span className='loading loading-dots w-[100px]'></span>
          </div>
        ):isError?(
          <div>Error: {error instanceof AxiosError? error.response?.data.msg ? error.response.data.msg:error.message  :"something went wrong" }</div>
        ):   
        (<div>
        <div className='py-4 text-center font-bold text-3xl '>
          {data.projectName}
        </div>
        <div className='text-center pb-2 '>
          {data.projectDescription}
          <div className='text-md text-darkRed pt-4'>{
            data.projectManager._id===_id?null:"only project managers of each project can evaluate"
            }</div>
          </div>
          {
            data.projectMembers.map((member:ProjectMember)=>{
              return(
                <div key={member.member._id}>
                    <MemberCard {...member} inProgress={inProgress} managerId={data.projectManager._id} projectId={params||""}/>
                </div>  
              )
            })
          }
       </div>
      
        )
}

    </div>
  )
}

export default DetailPage