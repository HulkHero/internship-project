import React from 'react'
import { IChat } from './Chat';
interface Props{
    chat:IChat,
    currentUser:string

}

const BarItem =(props:Props) => {
    const {chat,currentUser}=props;
    console.log(chat,"data");
    
    const otherUser=chat.members.find((member)=>member._id!==currentUser)
    




  return (
    <div>
      <div className="flex items-center justify-between  border-gray-200">
        {otherUser?.firstName +" "+otherUser?.lastName} 
       </div>
       <div className='text-sm'>
        {otherUser?.techRole}
       </div>

    </div>
  )
}

export default BarItem