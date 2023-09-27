import {
    useQuery,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'

const FetchMessages=<T extends {}>(_id:string)=>{
   return axiosInstance.get<T>(`/message/${_id}`)
}

export const useFetchMessages =<T extends {} > (_id:string)=> {
    return useQuery([`fetchMessages${_id}`], () => FetchMessages<T>(_id), {
         select: (data) => { return data.data},
          cacheTime:0

    })
}