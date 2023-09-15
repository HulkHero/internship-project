import React from 'react'
import CNavBar from '../../components/CNavBar'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
import { Outlet } from 'react-router-dom'
import SideNav from '../../components/SideNav'
const Company = () => {
  return (
    <div>
      <CNavBar/>
      <div className='flex flex-row'>
       <SideNav></SideNav>
       <div className='h-[91vh] overflow-y-scroll w-full overflow-x-scroll'><Outlet></Outlet></div>
      </div>
    </div>
  )
}

export default Company