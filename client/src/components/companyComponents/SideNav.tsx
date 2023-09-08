import React from 'react'
import { NavLink } from 'react-router-dom'
const SideNav = () => {
  return (
    <div className={` transition-all box shadow-md  top-16  h-[92vh] w-[150px] sm:min-w-[200px] md:[250px] bg-ligtDark`}>
    <div className=' text-white flex flex-col py-3 space-y-2 ml-2'>
        <NavLink to="/company/dashboard"  className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Dashboard</NavLink>
        <NavLink to="/company/addMember" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Add Members</NavLink>
        <NavLink to="/company/addKpi" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Add Kpi</NavLink>
        <NavLink to="/company/addProject" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Add Project</NavLink>
        <NavLink to="/company/chat" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Chat</NavLink>
        <NavLink to="/company/add" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Logout</NavLink>
        </div>

</div>
  )
}

export default SideNav