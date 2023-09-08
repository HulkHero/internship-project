import React, { SyntheticEvent } from 'react'
import BarItem from './BarItem'
import {User} from '../../types'
import { useFetchUsers } from '../../ReactKueries/useFetchUser'
import { IChat } from './Chat'
import { member } from './Chat'
import axiosInstance from '../../utils/interceptor'
import { OnChangeValue } from 'react-select'
import SmallCard from '../../components/smallCard'

interface Props{
    chats:IChat[]|undefined,
    currentChat:IChat|null,
    setCurrentChat:React.Dispatch<React.SetStateAction<IChat|null>>,
    user:User
}

interface Option {
  _id: string;
  firstName: string;
  lastName: string;
  systemRole: string;
  techRole: string;
}

const SideBar =({chats,currentChat,setCurrentChat,user}:Props) => {

  const [options, setOptions] = React.useState<Option[]|null>(null);
  const fetchOptions = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if(inputValue.length===0)
    {
      setOptions(null);
      return;
    }
    try {
      const response = await axiosInstance.get(`/user/search/${inputValue}`);
      console.log(response.data,"response")
    
      setOptions(response.data);
     
    } catch (err) {
      console.error(err);
      
    }
  };
  


  return (
    <div className='w-1/3 border-r-2  h-[92vh] overflow-x-scroll px-3 py-2'>
      <div>
        <div>
        <input type="text" name="search" onChange={fetchOptions} placeholder="Search User to start conversation" className="outline-none px-2 py-2 rounded-lg ring-1 focus:ring-2 focus:ring-blue-500 ring-blue-400 w-full max-w-xs" />
      
        </div>
        <div>
        {options && options.map((option) => (
               <div className='cursor-pointer' > <SmallCard _id={option._id} firstName={option.firstName} lastName={option.lastName} techRole={option.techRole} systemRole={option.systemRole} /> </div>
        ))}
        </div>
      </div>
      <div className='flex flex-col'>
      {chats && chats.map((chat:IChat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                className='cursor-pointer '
              >
                <BarItem
                  key={`(chat._id)`}
                  chat={chat}
                  currentUser={user._id}
                />
              </div>
            ))}
      </div>
    </div>
  )
}

export default SideBar