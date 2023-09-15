import React from 'react'
import { ProjectMember } from './DetailPage'
import CustomButton from '../../../../../components/CustomButton'
import { Link, createSearchParams } from 'react-router-dom'
import { authSelector } from '../../../../../redux/slices/authSlice'
import { useAppSelector } from '../../../../../redux/hooks'
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
            })}` }} className={`btn btn-primary ${disable===true ?"pointer-events-none opacity-60 ":""} btn-xs px-4`}>Evaluate</Link>
            {/* <CustomButton text={"evaluate"}  type={"button"} disabled={true} onClick={()=>{console.log("clicked")}} className='btn btn-primary disabled:text-smoke disabled:text-opacity-70 btn-xs px-4'/> */}
        </div>
    </div>
  )
}

export default MemberCard