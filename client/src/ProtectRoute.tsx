import React,{ ReactNode} from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}:{children:ReactNode}) => {
   const user=JSON.parse(localStorage.getItem('user')||"")
   console.log(user)
    if (user.systemRole==="admin" || user.systemRole==="manager" || user.systemRole==="employee"){
       return <>{children}</>
    }
    else{
       return <Navigate to="/login"></Navigate>
    }
   

}

export default ProtectedRoute