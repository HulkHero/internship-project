import { AxiosError } from "axios";

export interface userSignUp{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    companyName: string,
    tier: string,
}
export interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    companyName: string,
    tier: string,
    _id: string,
}


export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    token:string | null;
    systemRole:string;
  }

export interface IAddMember{
    
}

export interface MutationError{
    msg:string
}


