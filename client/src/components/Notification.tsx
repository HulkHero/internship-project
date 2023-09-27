import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { useSocket } from '../state/context'
import axiosInstance from '../utils/interceptor'
import { useQuery } from '@tanstack/react-query'

type Props = {}
interface Notification {
    message: string
    _id:string


}

const Notification = (props: Props) => {
    const {socket}=useSocket()
    //notification will be show for one day on 15th and 30th of every month
    const [showNotification,setShowNotification]=React.useState<boolean>(false);

    const {data:notification,isError,refetch}=useQuery(["notification"],()=>{
        return axiosInstance.get("/notification/get")
    },{select:(data)=>data.data.data,
      refetchInterval:1000*60*10*20,
      refetchOnWindowFocus:false,
    })
    React.useEffect(()=>{
        if(socket)
          socket.on("notification", (data:string) => {
        console.log("recieved notification",data)
        refetch()
          });
      },[socket])
      console.log(notification);
  return (
    <div>
    <div>
    <button onClick={()=>{setShowNotification(!showNotification)}} className='rounded-full indicator '>
          {notification?.lenght>0 &&<span className="indicator-item badge badge-primary badge-sm">{notification?.length}</span> }
          <IoNotificationsOutline size={20} ></IoNotificationsOutline>
    </button>
  </div>
    <div className={`z-[100000] max-h-[500px] overflow-y-auto absolute bg-white w-[300px] rounded-box text-ligtDark shadow-lg transition-all   ${showNotification===true?"right-0":"-right-[300px] hidden"} top-[9vh] `}>{
    notification && notification?.length>0 ? notification.map((item:Notification,index:number)=><>
          <div key={index}>
             {item.message}
          </div>
        </>)
       :<div className='text-center p-2'>No Notifications</div>}
    </div>
    </div>
  )
}

export default Notification