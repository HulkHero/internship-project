import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'

type Props = {}

const HomeButton = (props: Props) => {
  return (
    <div>
        <Link to='/'>
            <AiOutlineHome className='text-2xl text-white'/>
        </Link>
    </div>
  )
}

export default HomeButton