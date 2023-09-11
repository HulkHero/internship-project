import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { authSelector } from '../redux/slices/authSlice'
import { useLocation} from 'react-router-dom'
import Breadcrumbs from './BreadCrumb'
import { set } from 'react-hook-form'



const CNavBar = () => {
    const data=useAppSelector(authSelector)
    const [route, setRoute] = React.useState<string>("");
    const location = useLocation();
    React.useEffect(() => {
      console.log(location.pathname);
      setRoute(location.pathname);
    }, [location]);

  
  
    const [showSidebar,setShowSidebar]=React.useState<boolean>(false);
    const toggleSidebar=()=>{
        setShowSidebar(!showSidebar);
    }

  return (
    <div className='w-full'>
        <div  className='relative min-h-[50px] bg-dark text-white text-center mx-auto w-full flex p-3'>
                {
                    data && <div className='text-2xl px-4 italic text-brightRed text-center font-semibold'>{data.companyName}</div>
                }
               <div>
                <Breadcrumbs route={route}></Breadcrumbs>
                </div> 
        </div>
    </div>
  )
}

export default CNavBar