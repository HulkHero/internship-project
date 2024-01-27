import React from 'react'
import { ProjectMember } from './types'
import CustomButton from '../../../../../components/CustomButton'
import { Link, createSearchParams } from 'react-router-dom'
import { authSelector } from '../../../../../state/redux/slices/authSlice'
import { useAppSelector } from '../../../../../state/redux/hooks'
interface Props extends ProjectMember{
    inProgress:boolean
    projectId:string
    managerId:string

}

const MemberCard = (props:Props ) => {
    const {_id}=useAppSelector(authSelector)

    let isManager=_id===props.managerId
    let disable=props.inProgress===true || props.isEvaluated===true || isManager===false
    
  return (
    <div className='flex row justify-around flex-1 items-center border-2 bg-ligtDark text-white  m-2 rounded-xl '>
        <div>
            {props.member.firstName}
            {" "}
            {props.member.lastName}
        </div>
        <div>{props.member.techRole}</div>
        <div>{props.member.systemRole}</div>
        <div className='p-4'>
            <Link to={{pathname:`/company/evaluation/${props.projectId}/evaluate`,
            search:`?${createSearchParams({
                userId:props.member._id,
                techRole:props.member.techRole,
                type:'project'
            })}` }} className={`btn btn-primary ${disable===true ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>{props.isEvaluated===true?"Done":props.inProgress===true?"InProgress":"Evaluate"}</Link>
        </div>
    </div>
  )
}

export default MemberCard