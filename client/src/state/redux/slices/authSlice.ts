import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  token:string | null;
  systemRole:string;
}

const initialState: User = 
    {
        _id: '',   
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        token:null,
        systemRole:""
    }

if(localStorage.getItem('user')){
    console.log("localStorage.getItem('user')",localStorage.getItem('user'))
    const user = JSON.parse(localStorage.getItem('user') as string);
    initialState._id = user._id;
    initialState.firstName = user.firstName;
    initialState.lastName = user.lastName;
    initialState.email = user.email;
    initialState.companyName = user.companyName;
    initialState.token = user.token;
    initialState.systemRole = user.systemRole;
}    
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      console.log("action.payload",action.payload)
        return{
            _id: action.payload._id,
            firstName: action.payload.firstName,
            lastName:action.payload.lastName,
            email:action.payload.email,
            token:action.payload.token,
            companyName:action.payload.companyName,
            systemRole:action.payload.systemRole
        }

    },
    logOut: (state) => {
        localStorage.clear();
        return{
            _id: '',   
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            token:null,
            systemRole:""
        }
    }
  },
});
export const { addUser ,logOut} =
  authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;