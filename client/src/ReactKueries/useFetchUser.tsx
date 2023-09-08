
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'

const FetchUsers=(body:{body:string[]})=>{
   return axiosInstance.post(`/user/fetchMany/`,body)
}

export const useFetchUsers =(body:{body:string[]})=> {
    return useQuery(['fetchUsers'], () => FetchUsers(body), {
         select: (data) => data.data
    })
}