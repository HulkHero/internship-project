import React from 'react'
import CNavBar from '../../components/CNavBar'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
import { Outlet } from 'react-router-dom'
import SideNav from '../../components/SideNav'
import { ToastContainer } from 'react-toastify'
const Company = () => {
  return (
    <div>
      <CNavBar/>
      {/* <ToastContainer/> */}
      <div className='flex flex-row overflow-x-hidden'>
       <SideNav></SideNav>
       <ToastContainer/>
       <div className='h-[91vh] overflow-y-scroll w-full overflow-x-hidden'> <Outlet></Outlet></div>
      </div>
    </div>
  )
}

export default Company