// SocketHOC.tsx
import React, { useEffect, useRef } from 'react';
import io, { SocketOptions } from 'socket.io-client';
import {Socket} from 'socket.io-client';
import { useAppSelector } from '../redux/hooks';
import { authSelector } from '../redux/slices/authSlice';
export interface SocketHOCProps {
    socket: Socket;
}

const withSocket = <P extends object>(WrappedComponent: React.ComponentType<P & SocketHOCProps>) => {
    
    const WithSocket: React.FC<P> = (props) => {
        const socketRef = useRef<Socket | null>(null);
        const user=useAppSelector(authSelector)
        console.log(user._id)

        useEffect(() => {
            socketRef.current = io('ws://localhost:8800');
            socketRef.current.emit("new-user-add", user._id);
            socketRef.current.on("get-users", (users) => {
               console.log(users,"users")
            });
           
           
            // return () => {
            //     console.log("disconnecting")
            //     // Clean up the socket connection when the component unmounts
            //     if (socketRef.current) {
            //         socketRef.current.disconnect();
            //     }
            // };
        }, []);

        return <WrappedComponent {...props} socket={socketRef.current as Socket} />;
    };

    return WithSocket;
};

export default withSocket;
