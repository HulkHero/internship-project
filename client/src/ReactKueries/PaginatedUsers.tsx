import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'
interface Props{
    page:number
    limit:number
    searche:string
    filter:string
    key?:string

}
const PaginatedUsers=({page,limit,searche,filter}:Props)=>{
   return axiosInstance.get(`/user/getAllUsers?page=${page}&&limit=${limit}&&searche=${searche}&&filter=${filter}`)
}

export const usePaginatedUsers =(props:Props)=> {
    return useQuery(['paginatedUsers',props.page ,props.key], () => PaginatedUsers(props), {
         select: (data) => {console.log(data.data,"h");return data.data},
        
    })
}