import React,{ ReactNode} from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}:{children:ReactNode}) => {
   if (localStorage.getItem('user')===null){
      return <Navigate to="/login"></Navigate>
   }
   const user=JSON.parse(localStorage.getItem('user')||"")
   console.log(user)
    if (user.token){
       return <>{children}</>
    }
    else{
       return <Navigate to="/login"></Navigate>
    }
   

}

export default ProtectedRoute