import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { io, Socket } from 'socket.io-client';
import { authSelector } from './redux/slices/authSlice';
import { useAppSelector } from './redux/hooks';

type SocketContextType = {
    socket: Socket | null;
    isSocketInitialized: boolean;
  };

const SocketContext = createContext<SocketContextType>({ socket: null, isSocketInitialized: false });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);
    const [isSocketInitialized, setIsSocketInitialized] = useState(false);
    const user=useAppSelector(authSelector)

    useEffect(() => {
        socketRef.current= io('ws://localhost:8800'); 
        socketRef.current?.emit('new-user-add',{newUserId:user._id,companyName:user.companyName,systemRole:user.systemRole})

        if(socketRef.current){
            setIsSocketInitialized(true);
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.emit('CustomDisconnect');
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
