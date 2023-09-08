import React,{useState,useRef,useEffect} from 'react'
import SideBar from './SideBar'
import ChatRoom from './ChatRoom'
import { Socket, io } from "socket.io-client";
import { useAppSelector } from '../../redux/hooks';
import { authSelector } from '../../redux/slices/authSlice';
import axiosInstance from '../../utils/interceptor';
import { useFetchChats } from '../../ReactKueries/useFetchChats';
import { User } from '../../types';


export interface member{
    _id:string,
    firstName:string,
    lastName:string,
    systemRole:string,
    techRole:string,
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

    const {data:chats}=useFetchChats<IChat[]>(user._id)
    console.log(chats,"chats");
  
    // const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState<IChat|null>(null);
    const [sendMessage, setSendMessage] = useState<ISendMessage|null>(null);
    const [receivedMessage, setReceivedMessage] = useState<IReceivedMessage|null>(null);

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

      // const checkOnlineStatus = (chat) => {
      //   const chatMember = chat.members.find((member) => member !== user._id);
      //   const online = onlineUsers.find((user) => user.userId === chatMember);
      //   return online ? true : false;
      // };


  return (
     <div className="w-full flex justify-left   ">
        <SideBar chats={chats} user={user } currentChat={currentChat } setCurrentChat={setCurrentChat} />
       
       {currentChat? <ChatRoom 
          chat={currentChat}
          currentUser={user._id}
          user={user}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
       :"Select a chat"}
     </div>
  )
}

export default Chat