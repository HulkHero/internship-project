import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { set } from 'react-hook-form';
import { io, Socket } from 'socket.io-client';
import { authSelector } from './slices/authSlice';
import { useAppSelector } from './hooks';

// Define the type for the SocketContext
// type SocketContextType = Socket | null;
type SocketContextType = {
    socket: Socket | null;
    isSocketInitialized: boolean;
  };

const SocketContext = createContext<SocketContextType>({ socket: null, isSocketInitialized: false });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [isSocketInitialized, setIsSocketInitialized] = useState(false);
    const user=useAppSelector(authSelector)

    useEffect(() => {
        socketRef.current= io('ws://localhost:8800'); // Create and store the socket instance
        socketRef.current?.emit('addUser',{newUserId:user._id,companyName:user.companyName,systemRole:user.systemRole})
        // setSocket(socketRef.current);
        // console.log("renderd")
        if(socketRef.current){
            setIsSocketInitialized(true);
        }
        return () => {
            // Clean up the socket connection when the component unmounts
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return (
        <SocketContext.Provider  value={{socket:socketRef.current as Socket,isSocketInitialized:isSocketInitialized}} >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = ()=> {
    return useContext(SocketContext);
};
