import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { authSelector,logOut } from '../redux/slices/authSlice'
import { useNavigate, useLocation} from 'react-router-dom'
import Breadcrumbs from './BreadCrumb'
import axiosInstance from '../utils/interceptor'

import {IoNotificationsOutline,IoLogOutOutline} from 'react-icons/io5'
import { useSocket } from '../redux/context'


const CNavBar = () => {

    const data=useAppSelector(authSelector)
    const socket=useSocket()
    const [route, setRoute] = React.useState<string>("");
    const [notification,setNotification]=React.useState<string[]>([])
    const [showSidebar,setShowSidebar]=React.useState<boolean>(false);
    const [showNotification,setShowNotification]=React.useState<boolean>(false);
    const location = useLocation();
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    React.useEffect(() => {
      setRoute(location.pathname);
    }, [location]);

    React.useEffect(()=>{
      if(socket)
        socket.on("notification", (data:string) => {
          setNotification([data,...notification])
          console.log(data,"nds")
        });

    },[socket])
    console.log(notification,"notification")

  
  
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
               <div>
                <div className={` absolute bg-white w-56 rounded-box text-ligtDark shadow-lg transition-all   ${showNotification===true?"right-0":"-right-[300px] hidden"} top-[9vh] `}>{
                 notification.map((item,index)=><>
                   <div>
                      {item}
                   </div>
                 </>
                  

                  )
                }

                </div>

               </div>

         <div className='flex items-center justify-center gap-4'>
              <div>
                <button onClick={()=>{setShowNotification(!showNotification)}} className='rounded-full indicator '>
                      <span className="indicator-item badge badge-primary badge-sm">{notification.length}</span> 
                      <IoNotificationsOutline size={20} className='hover:stroke-darkRed'></IoNotificationsOutline>
                </button>
              </div>
           <div>
             <button onClick={()=>handleLogout()} className=''>
                  <IoLogOutOutline size={20} className='hover:stoke-darkRed'></IoLogOutOutline>
              </button> 
              </div>         
         </div>
        </div>

    </div>
  )
}

export default CNavBar