import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'
interface Props{
    page:number
}
const PaginatedUsers=(page:number)=>{
   return axiosInstance.get(`/user/getAllUsers?page=${page}&&limit=10`)
}

export const usePaginatedUsers =(page:number)=> {
    return useQuery(['paginatedUsers',page ], () => PaginatedUsers(page), {
         select: (data) => {console.log(data); return data.data},
        
    })
}