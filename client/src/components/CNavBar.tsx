import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { authSelector,logOut } from '../redux/slices/authSlice'
import { useNavigate, useLocation} from 'react-router-dom'
import Breadcrumbs from './BreadCrumb'



import {PiSignOutBold} from 'react-icons/pi'
import axiosInstance from '../utils/interceptor'

const CNavBar = () => {
    const data=useAppSelector(authSelector)
    const [route, setRoute] = React.useState<string>("");
    const location = useLocation();
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    React.useEffect(() => {
      console.log(location.pathname);
      setRoute(location.pathname);
    }, [location]);

  
  
    const [showSidebar,setShowSidebar]=React.useState<boolean>(false);
    const toggleSidebar=()=>{
        setShowSidebar(!showSidebar);
    }
    const handleLogout=async()=>{

        axiosInstance.post("/user/logout").then((res)=>{
          
          dispatch(logOut());
          navigate("/login");
      }).catch((err)=>{
          console.log(err);
      });
      }
  return (
    <div className='w-full'>
        <div  className='relative max-h-[9vh] bg-dark text-white text-center w-full flex justify-between items-center p-3'>
               <div className='flex flex-row'>{
                    data && <div className='text-2xl  italic text-brightRed text-center px-6 font-bold'>{data.companyName}</div>
                }
               <div>
                <Breadcrumbs route={route}></Breadcrumbs>
                </div> 
                </div> 

         <div className=''>
             <button onClick={()=>{dispatch(logOut());navigate("/")}} className='px-3'>
              
              <PiSignOutBold size={20} className='hover:stroke-slate-950'></PiSignOutBold>
              
              </button>          
         </div>
        </div>

    </div>
  )
}

export default CNavBar