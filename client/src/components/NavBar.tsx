import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row justify-between items-center p-5'>
        <div>Easy Assess</div>
        <div className='flex flex-row space-x-4 '>
        <div>
            <Link to='/login'>Login</Link>
        </div>
        <div>
            <Link to='/signup'>Signup</Link>
        </div>
        </div>

    </div>
  )
}

export default NavBar