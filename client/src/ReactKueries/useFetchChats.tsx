import {useQuery} from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'

const FetchChats=<T extends {}>(_id:string)=>{
   return axiosInstance.get<T>(`/chat/${_id}`)
}

export const useFetchChats =<T extends {} > (_id:string)=> {
    return useQuery(['fetchChat'], () => FetchChats<T>(_id), {
         select: (data) => {return data.data},
    })
}