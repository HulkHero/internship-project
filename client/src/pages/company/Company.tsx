import React from 'react'
import CompanyNavBar from '../../components/CompanyNavBar'
import { Outlet } from 'react-router-dom'
import SideNav from '../../components/SideNav'
import { ToastContainer,Slide } from 'react-toastify'

const Company = () => {
  const [sideNav,setSideNav]=React.useState(false)
  const toggleSideNav=()=>{
    setSideNav(!sideNav)
  }

  return (
    <div>
      <CompanyNavBar toggleSideNav={toggleSideNav}/>
      <div className='flex flex-row overflow-x-hidden'>
          <SideNav sideNav={sideNav} ></SideNav>
       <ToastContainer theme={'colored'} transition={Slide}/>
       <div className='h-[91vh] overflow-y-scroll w-full overflow-x-hidden'> <Outlet></Outlet></div>
      </div>
    </div>
  )
}

export default Company