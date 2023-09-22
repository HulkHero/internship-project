import React from 'react'
import { NavLink } from 'react-router-dom'
import  {AiOutlineDoubleRight} from "react-icons/ai"
import {MdOutlineKeyboardDoubleArrowDown} from "react-icons/md"
interface Props{
  sideNav:boolean
}
const SideNav = ({sideNav}:Props) => {
  const [openENavs, setOpenENavs] = React.useState(false)
  const [one, setOne] = React.useState(true)
  const [isEActive, setIsEActive] = React.useState(false)
  const handleENavs = () => {
    setOne(true)
    if(isEActive===true){
      setOpenENavs(!openENavs)
    }
    else{
      setOpenENavs(true)
      
    }
  }
  console.log(sideNav,"sideNav")

  return (
    <div className={`relative ${sideNav===true?"l":"hidden"} sm:block   transition-all box shadow-md   min-h-[91.3vh] w-[150px] sm:min-w-[200px] md:[250px] bg-ligtDark`}>
    <div className=' text-white flex flex-col py-3 space-y-2 ml-2'>
        <NavLink to="/company/"  className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Dashboard</NavLink>
        <NavLink to="/company/Member" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Members</NavLink>
        <NavLink to="/company/addKpi" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Add Kpi</NavLink>
        <NavLink to="/company/evaluation" onClick={handleENavs} className={({isActive})=>{ isActive===true? setIsEActive(true):setIsEActive(false) ;return(isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95')}}>
       <div className='flex justify-between pr-1'> <div>Evaluation</div><AiOutlineDoubleRight className={`${openENavs===true? "transition-all rotate-90 ":"transition-all rotate-0"}  text-xl opacity-95`}/></div>
          {/* {openENavs===true? <div className='flex justify-between'> <div>Evaluation</div><MdOutlineKeyboardDoubleArrowDown className='text-xl opacity-95'/></div>:<div className='flex justify-between'> <div>Evaluation</div><AiOutlineDoubleRight className='text-xl opacity-95'/></div>  } */}
        </NavLink>
        
           {openENavs? <><NavLink to="/company/evaluation" onClick={()=>setOne(true)} className={({isActive})=> isActive===true && one===true ? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-5 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Projects</NavLink>
            <NavLink to="/company/evaluation/timeBase" onClick={()=>setOne(false)} className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-5 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>TimeBase</NavLink>

    </> :null}
        <NavLink to="/company/chat" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Chat</NavLink>
        <NavLink to="/company/add" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Logout</NavLink>
      
        </div>

</div>
  )
}

export default SideNav