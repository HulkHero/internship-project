import React from 'react'
import { useAppDispatch, useAppSelector } from '../state/redux/hooks'
import { authSelector,logOut } from '../state/redux/slices/authSlice'
import { useNavigate, useLocation} from 'react-router-dom'
import Breadcrumbs from './BreadCrumb'
import axiosInstance from '../utils/interceptor'
import {IoLogOutOutline} from 'react-icons/io5'
import Notification from './Notification'
import { toast } from 'react-toastify'

interface Props{
  toggleSideNav:()=>void
}

const CompanyNavBar = ({toggleSideNav}:Props) => {

    const data=useAppSelector(authSelector)
    const [route, setRoute] = React.useState<string>("");

    const location = useLocation();
    const navigate=useNavigate()
    const dispatch=useAppDispatch()

    React.useEffect(() => {
      setRoute(location.pathname);
    }, [location]);


    const handleLogout=async()=>{
        axiosInstance.post("/user/logout").then((res)=>{
          dispatch(logOut());
          navigate("/login");
      }).catch((err)=>{
          toast.error("Something went wrong")
      });
      }
  return (
    <div className='w-full'>
        <div  className='relative max-h-[9vh] bg-dark text-white text-center  w-full flex justify-center  items-center p-3'>
              <div className='sm:hidden w-fit align-middle '>
              <label className="btn btn-ghost btn-xs btn-circle self-center swap swap-rotate">
                <input  onClick={()=>toggleSideNav()} type="checkbox" />
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                
              </label>
              </div>
              <div className='w-full flex justify-between  items-center'>
               <div className='flex flex-row '>{
                    data && <div className='text-2xl  italic text-brightRed text-center align-middle max-[500px]:hidden  self-center max-sm:px-2 sm:px-6 font-bold'>{data.companyName}</div>
                }
               <div className='max-sm:ml-2'>
                <Breadcrumbs route={route}></Breadcrumbs>
                </div> 
                </div> 
         <div className='flex items-center justify-center gap-4'>
          <Notification></Notification>   
           <div>
             <button onClick={()=>handleLogout()} className=''>
                  <IoLogOutOutline size={20} className='hover:stoke-darkRed'></IoLogOutOutline>
              </button> 
              </div>         
         </div>
        </div></div>

    </div>
  )
}

export default CompanyNavBar