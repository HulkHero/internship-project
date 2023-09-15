import React,{useState,useRef,useEffect} from 'react'
import SideBar from './SideBar'
import ChatRoom from './ChatRoom'
import { Socket, io } from "socket.io-client";
import { useAppSelector } from '../../../redux/hooks';
import { authSelector } from '../../../redux/slices/authSlice';
import axiosInstance from '../../../utils/interceptor';
import { useFetchChats } from '../../../ReactKueries/useFetchChats';
import { IAddMember, User } from '../../../types';


export interface member{
    _id:string,
    firstName:string,
    lastName:string,
    systemRole:string,
    techRole:string,
}

export interface userId{
    userId:string,
}

export interface IChat{
    _id:string,
    members:member[], 
    companyName:string,
}

export interface IReceivedMessage{
      senderId : string
      text: string
      chatId: string,
      createdAt?: string
}

export interface ISendMessage{
    receiverId? : string
    senderId: string
    text: string
    chatId: string|undefined,
    createdAt?: string
}


const Chat = () => {
    const socket: { current: Socket } = { current: io("ws://localhost:8800") };
 
    const user=useAppSelector(authSelector)
    const [chats, setChats] = useState<IChat[]|undefined>([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState<IChat|null>(null);
    const [sendMessage, setSendMessage] = useState<ISendMessage|null>(null);
    const [receivedMessage, setReceivedMessage] = useState<IReceivedMessage|null>(null);

    const {data,isLoading,isError,error}=useFetchChats<IChat[]>(user._id)
    useEffect(() => {
      if (data){
        setChats(data);
      }
    }, [data]);

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }, [user]);
      
    useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
      }, [sendMessage]);

    useEffect(() => {
      socket.current.on("recieve-message", (data) => {
        setReceivedMessage(data);
      }
        );
    }, []);

  return (
     <div className="w-full flex justify-left   ">
        <SideBar chats={chats}  setChats={setChats} isLoading={isLoading} onlineUsers={onlineUsers} user={user } currentChat={currentChat } setCurrentChat={setCurrentChat} />
       
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