import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {
    children: React.ReactNode,
    roles: string[]
}

const AuthZProtect = (props: Props) => {
    const user=JSON.parse(localStorage.getItem('user')||"")
    console.log("uAuthr",user)
    if(props.roles.includes(user.systemRole)){
        return <>{props.children}</>
    }
    else{
        // no unauthorized access page , redirect to chat
        return <Navigate to="/company/chat" />
    }

}

export default AuthZProtect