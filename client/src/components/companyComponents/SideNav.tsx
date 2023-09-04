import React from 'react'
import { Link } from 'react-router-dom'
const SideNav = () => {
  return (
    <div className={` transition-all box shadow-md  top-16  h-[91vh] w-[150px] sm:min-w-[200px] md:[250px] bg-teal-600 `}>
    <div className='bg-teal-600 text-white flex flex-col gap-4 p-4'>
        <Link to="/company/addMember" className='text-md font-semibold'>Dashboard</Link>
        <Link to="/company/addMember" className='text-md font-semibold'>Add Members</Link>
        <Link to="/company/addKpi" className='text-md font-semibold'>Add Kpi</Link>
        <Link to="/company/addProject" className='text-md font-semibold'>Add Project</Link>
        <Link to="/company" className='text-md font-semibold'>Logout</Link>
        </div>

</div>
  )
}

export default SideNav