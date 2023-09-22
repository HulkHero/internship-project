import React from 'react'
import CNavBar from '../../components/CNavBar'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
import { Outlet } from 'react-router-dom'
import SideNav from '../../components/SideNav'
import { ToastContainer } from 'react-toastify'
const Company = () => {
  const [sideNav,setSideNav]=React.useState(false)
  const toggleSideNav=()=>{
    setSideNav(!sideNav)
  }

  return (
    <div>
      <CNavBar toggleSideNav={toggleSideNav}/>
      {/* <ToastContainer/> */}
      <div className='flex flex-row overflow-x-hidden'>
          <SideNav sideNav={sideNav} ></SideNav>
       <ToastContainer/>
       <div className='h-[91vh] overflow-y-scroll w-full overflow-x-hidden'> <Outlet></Outlet></div>
      </div>
    </div>
  )
}

export default Company