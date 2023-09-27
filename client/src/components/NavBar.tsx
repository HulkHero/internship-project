import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row bg-dark justify-between items-center p-5 '>
         
        <div className='text-darkRed font-bold text-3xl italic opacity-100'>Easy Assess</div>
        <div className='flex flex-row space-x-4 text-neutral-400 '>
        <div className=''>
            <Link to='/login' className=' hover:text-white transition-all duration-300 '>Login</Link>
        </div>
        <div  className=''>
            <Link to='/signup' className=' hover:text-white transition-all duration-300 '>Signup</Link>
        </div>
        </div>

    </div>
  )
}

export default NavBar