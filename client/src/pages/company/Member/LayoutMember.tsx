import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutMember = () => {
  return (
      <div className='h-[92vh] overflow-y-scroll'>
        <Outlet></Outlet>
      </div>
  )
}

export default LayoutMember