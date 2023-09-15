import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import {useParams,useSearchParams} from "react-router-dom"
import axiosInstance from '../../../../../utils/interceptor'
import MemberCard from './MemberCard'

export interface ProjectDetail{
  _id:string,
  projectName:string,
  projectDescription:string,
  projectEndDate:Date,
  projectStartDate:Date,
  projectManager:Member[],
  members:{}[]

}

export interface ProjectMember{
   member:Member,
   isEvaluated:boolean,
   evaluation:string|null
}
export interface Member{
  _id:string,
  firstName:string,
  lastName:string,
  techRole:string,
  systemRole:string
}

const DetailPage = () => {
  const params=useParams()._id

  const [inProgress,setInProgress]=React.useState(true)
  const {data,isLoading,error,isError}=useQuery(["projectDetail",params],()=>{
    return axiosInstance.get(`/project/singleProject/${params}`)
  },{select:(data)=>data.data.data})
  
  useEffect(()=>{
  console.log(data,"data")
  if(data){
    const projectEndDate = new Date(data.projectEndDate);
  if(projectEndDate<new Date()){
    console.log("project ended")
    setInProgress(false);
  }}
  },[data])

  return (
    <div>
      {
        isLoading?(
          <span className='loading loading-dots'>Loading</span>
        ):isError?(
          <div>Error</div>
        ):(
           null
        )
      }
      {
       data &&<div>
        <div>
          {data.projectName}
        </div>
        <div>
          {data.projectDescription}
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
      }
      <div>
          
      </div>
    </div>
  )
}

export default DetailPage