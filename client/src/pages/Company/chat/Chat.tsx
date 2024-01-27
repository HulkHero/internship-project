import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import ChatRoom from './ChatRoom'
import { useAppSelector } from '../../../state/redux/hooks';
import { authSelector } from '../../../state/redux/slices/authSlice';
import { useFetchChats } from '../../../ReactKueries/useFetchChats';
import { useSocket } from '../../../state/context';
import { IChat, IReceivedMessage, ISendMessage } from './types';


const Chat = () => {
      const {socket,isSocketInitialized}=useSocket() 
         
      console.log(socket,"socket")
    const user=useAppSelector(authSelector)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState<IChat|null>(null);
    const [sendMessage, setSendMessage] = useState<ISendMessage|null>(null);
    const [receivedMessage, setReceivedMessage] = useState<IReceivedMessage|null>(null);

    const {data:chats,isLoading,isError,error}=useFetchChats<IChat[]>(user._id)

    useEffect(() => {
      
      if(socket){
        socket.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }
      }, [user,socket]);
      
    useEffect(() => {
      if (sendMessage!==null && socket!==null) {
        socket.emit("send-message", sendMessage);}
      }, [sendMessage]);

    useEffect(() => {
      if(socket){
      socket.on("recieve-message", (data) => {
        setReceivedMessage(data);
      }
        );
    }
    }, [socket]);

  return (
     <div className="w-full flex justify-left   ">
      {isError?<div>Error Fetching Chats</div>
        :<SideBar chats={chats} isLoading={isLoading} onlineUsers={onlineUsers} user={user } currentChat={currentChat } setCurrentChat={setCurrentChat} />
  }
       {currentChat? <ChatRoom 
          chat={currentChat}
          currentUser={user._id}
          user={user}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
       :<div className='w-fit mx-auto my-auto'>Select a chat</div>}
     </div>
  )
}

export default Chat