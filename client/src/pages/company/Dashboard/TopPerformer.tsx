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
           {/* <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div> */}
        
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