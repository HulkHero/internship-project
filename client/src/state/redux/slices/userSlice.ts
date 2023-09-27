import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface User {
  
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  tier:string;
}
const initialState: User = 
    {
        firstName: '',
        lastName: '',
        email: '',
        password:"",
        companyName: '',
        tier:""
    }
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
        return{
          
            firstName: action.payload.firstName,
            lastName:action.payload.lastName,
            email:action.payload.email,
            password:action.payload.password,
            companyName:action.payload.companyName,
            tier:action.payload.tier  
        }

    },
  },
});
export const { addUser } =
  userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;