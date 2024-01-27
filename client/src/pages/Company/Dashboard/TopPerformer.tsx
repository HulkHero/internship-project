import React from 'react'

type Props = {
    firstName:string
    lastName:string
    techRole:string
    systemRole:string
    averageScore:number
    topPerfomer?:boolean
}

const TopPerformer = (props: Props) => {
  return (
    <div className='stats mx-4 my-4 min-w-[200px] bg-gradient-to-r from-sky-400 to-cyan-300 '>
        <div className='stat'>
        <div className='stat-title'>
        {props.topPerfomer===true?"Top Performer":"Score" }
         </div>   
         <div className='stat-value'>
            {props.averageScore}
           </div>         
        <div className='stat-value'>
            {props.firstName} {props.lastName}
        </div>
        <div className='stat-desc'>
            {props.techRole} - {props.systemRole || "admin"}
        </div>
           </div>
    </div>
  )
}

export default TopPerformer