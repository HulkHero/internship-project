import React from 'react'
import { Navigate,} from 'react-router-dom'

type Props = {
    children: React.ReactNode,
    roles: string[]
}

const AuthZProtect = (props: Props) => {
    const user=JSON.parse(localStorage.getItem('user')||"")
    if(props.roles.includes(user.systemRole)){
        return <>{props.children}</>
    }
    else{
        
        return <Navigate to="/company/chat" />
    }

}

export default AuthZProtect