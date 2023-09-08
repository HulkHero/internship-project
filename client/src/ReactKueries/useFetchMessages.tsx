import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'

const FetchMessages=<T extends {}>(_id:string)=>{
   return axiosInstance.get<T>(`/message/${_id}`)
}

export const useFetchMessages =<T extends {} > (_id:string)=> {
    return useQuery(['fetchMessages'], () => FetchMessages<T>(_id), {
        // select: (data) => data.data
         select: (data) => {console.log(data); return data.data},
         refetchInterval:10000

    })
}