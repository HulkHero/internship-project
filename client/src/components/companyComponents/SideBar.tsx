import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    show:boolean,
}

const SideBar = ({show}:Props) => {
  return (
    <div className={`absolute ${show?"left-0":"-left-[400px]"}  transition-all box shadow-md  top-16  h-[91vh] w-[150px] sm:min-w-[200px] md:[250px] bg-teal-600 overflow-y-scroll   `}>
        <div className='bg-teal-600 text-white flex flex-col gap-4 p-4'>
            <Link to="/company/addMember" className='text-md font-semibold'>Dashboard</Link>
            <Link to="/company" className='text-md font-semibold'>Add Members</Link>
            <Link to="/company" className='text-md font-semibold'>View Test</Link>
            <Link to="/company" className='text-md font-semibold'>View Results</Link>
            <Link to="/company" className='text-md font-semibold'>Logout</Link>
            </div>
    
    </div>
  )
}

export default SideBar