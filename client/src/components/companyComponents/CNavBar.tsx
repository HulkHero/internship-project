import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'
import SideBar from './SideBar'

const CNavBar = () => {
    const data=useAppSelector(authSelector)
    console.log(data,"data");
    const [showSidebar,setShowSidebar]=React.useState<boolean>(false);
    const toggleSidebar=()=>{
        setShowSidebar(!showSidebar);
    }

  return (
    <div className='w-full'>
        <div  className='relative min-h-[50px] bg-teal-800 text-white text-center mx-auto w-full flex p-4'>
            
                {
                    data && <div className='text-2xl text-center font-semibold'>{data.companyName}</div>
                }
           
        </div>
    </div>
  )
}

export default CNavBar