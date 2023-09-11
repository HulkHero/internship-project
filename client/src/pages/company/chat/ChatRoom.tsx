import {useEffect,useState,useRef, SyntheticEvent, FormEvent} from 'react'
import { IChat, ISendMessage } from './Chat'
import { IReceivedMessage } from './Chat'
import { User } from '../../../types'
import useFetch from '../../../hooks/useFetch'
import { useFetchMessages } from '../../../ReactKueries/useFetchMessages'
import axiosInstance from '../../../utils/interceptor'
import { format } from 'timeago.js'
import { useQuery } from '@tanstack/react-query'
import { DateTime } from "luxon";
interface Props{
  chat:IChat|null
  currentUser:string
  setSendMessage:React.Dispatch<React.SetStateAction<ISendMessage|null>>
  receivedMessage:IReceivedMessage|null
  user:User
}
const ChatRoom = ({chat,currentUser,setSendMessage,receivedMessage,user}:Props) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState<IReceivedMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("first render");
  const receiver = chat?.members.find((item)=>item._id!==currentUser);

  const { data,isLoading } =useFetchMessages<IReceivedMessage[]>(chat?._id||"");
  useEffect(() => {
        if (data){
          setMessages(data);
        }
  }, [data]);

  // const {data,isLoading,error}=useFetch<IReceivedMessage[]>({endPoint:`/message/`,params:`${chat?._id}`})

  const handleChange = (newMessage:string)=> {
    console.log(newMessage)
    
  }

   // Send Message
   const handleSend = async(e:SyntheticEvent<HTMLFormElement>)=> {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const messageee = formData.get('message') as string; // Assuming your input field has name="message"

    setNewMessage(messageee);
    


  
  const message :ISendMessage = {
    receiverId : receiver?._id,
    senderId: currentUser,
    text: messageee,
    chatId: chat?._id,
    createdAt: new Date().toISOString(),
}
  // send message to socket server

  setSendMessage(message)
  //send message to database
  try {
    const { data } = await axiosInstance.post("/message", message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])


  useEffect(()=> {
  
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  
  },[receivedMessage])
    const scroll = useRef<HTMLDivElement|null>(null);
    const imageRef = useRef<HTMLInputElement|null>(null);

  return (
    <div className='w-full h-[92vh] bg-smoke overflow-y-scroll'>
      <div className='bg-darkRed text-white px-4 py-2'>
        <div className='text-xl'>
          {receiver?.firstName} {receiver?.lastName}
        </div>
        <div className='text-sm'>
          {receiver?.techRole}-
          {receiver?.systemRole}
        </div>
      </div>
      <div>
      <div className="w-full h-[75vh] overflow-y-scroll bg-smoke" >
           
              {messages.length>0 ? messages.map((message) => {
                let date = DateTime.fromISO(message.createdAt||"");
                let time = date.toRelative();  
                return(
                <>
                  <div ref={scroll} className={`chat ${message.senderId===currentUser?"chat-end ":"chat-start"} `}>
                    <div className={`chat-bubble ${message.senderId===currentUser? "chat-bubble-success":"bg-blue-500 text-white"}`}>{message.text}</div>
                  <div className='chat-footer'>{time}</div>
                   
                  </div>
                  
                  
                  {/* <div ref={scroll}
                  className={`${message.senderId===currentUser?"ml-auto":"mr-auto"} w-fit  px-5 flex flex-col`}
                  >
                    <div className={`${message.senderId===currentUser?"bg-blue-300 ml:auto chat chat-end items-end":"bg-gray-200 chat chat-start mr-auto items-start"} w-fit flex flex-col max-w-xs my-2 p-4 rounded-lg shadow-md`}>
                        <div className=" font-semibold text-gray-800"></div>
                        <div className="text-gray-700">{message.text}</div>
                        <div className="text-xs text-gray-500 mt-1">{time}</div>
                    </div>
                  </div> */}
                </>
              )}):<div className='flex items-center '>
                  { isLoading?"Loading":"Start new conversation"}
                </div>}
            </div>
      </div>
      <div className="border-t-2">
          <div>
            <form onSubmit={handleSend} className="py-1 px-10 flex gap-2  ">
              <input type="text" name="message" placeholder="Type a message" className='outline-none ring-1 ring-gray-400 px-4 py-2 w-full focus:ring-2 rounded-lg focus:ring-brightRed ' />
              <button type='submit' className='btn btn-circle btn-primary'>Send</button>
              </form>
            </div>   
      </div>
    </div>
  )
}

export default ChatRoom