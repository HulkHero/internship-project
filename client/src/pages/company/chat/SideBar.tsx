import React, { SyntheticEvent } from 'react'
import BarItem from './BarItem'
import {User} from '../../../types'
import { useFetchUsers } from '../../../ReactKueries/useFetchUser'
import { IChat, userId } from './Chat'
import { member } from './Chat'
import axiosInstance from '../../../utils/interceptor'
import { OnChangeValue } from 'react-select'
import { useQueryClient, } from "@tanstack/react-query"
import SmallCard from '../../../components/smallCard'

interface Props{
    chats:IChat[]|undefined,
    currentChat:IChat|null,
    setCurrentChat:React.Dispatch<React.SetStateAction<IChat|null>>,
    setChats:React.Dispatch<React.SetStateAction<IChat[]|undefined>>,
    user:User,
    onlineUsers:userId[],
}

interface Option {
  _id: string;
  firstName: string;
  lastName: string;
  systemRole: string;
  techRole: string;

}

const SideBar =({chats,onlineUsers,currentChat,setCurrentChat,user,setChats}:Props) => {
  const kueryClient = useQueryClient();


  const [options, setOptions] = React.useState<Option[]|null>(null);
  const fetchOptions = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if(inputValue.length===0)
    {
      setOptions(null);
      return;
    }
    const existingUserIds = chats?.flatMap(chat =>
      chat.members.map(member => member._id)
    );
    try {
      const response = await axiosInstance.get(`/user/search/${inputValue}`);
      if(existingUserIds){
        const filteredOptions = response.data.filter((user:Option) => !existingUserIds.includes(user._id));
        setOptions(filteredOptions);
      }else{
        setOptions(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = async (_id:string) => {
    const body = {
      senderId:user._id,
      receiverId:_id
    }
    try {
      const response = await axiosInstance.post(`/chat`,body);
      kueryClient.invalidateQueries({ queryKey: ["fetchChat"]});

      setOptions(null);
     
    } catch (err) {
      console.error(err);
      
    }
  }


  const checkOnlineStatus = (chat:IChat) => {
    const chatMember = chat.members.find((member:member) => member._id !== user._id);
   
    const online = onlineUsers.find((user:userId) => user.userId === chatMember?._id);
    return online ? true : false;
  };
  


  return (
    <div className='w-1/3 bg-white h-[92vh] overflow-x-scroll pl-2 py-2'>
      <div>
        <div className='pr-2'>
        <input type="text" name="search" onChange={fetchOptions} placeholder="Search User to start conversation" className="outline-none px-2 py-2 rounded-lg ring-1 focus:ring-2 focus:ring-blue-500 ring-blue-400 w-full max-w-xs" />
      
        </div>
        <div>
        {options && options.map((option) => (
               <button className='cursor-pointer' onClick={()=>addUser(option._id)} > <SmallCard _id={option._id} firstName={option.firstName} lastName={option.lastName} techRole={option.techRole} systemRole={option.systemRole} /> </button>
        ))}
        </div>
      </div>
      <div className='flex flex-col mt-3'>
      {chats && chats.map((chat:IChat) => (
        <>
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                className={`${chat._id===currentChat?._id ?"bg-blue-300 ":"" } pl-2 py-1 rounded-l-lg cursor-pointer `}
              >
                <BarItem
                  key={`(chat._id)`}
                  chat={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              
              </div>
             
                </>
            ))}
      </div>
    </div>
  )
}

export default SideBar