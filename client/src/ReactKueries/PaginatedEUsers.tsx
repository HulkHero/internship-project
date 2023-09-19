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
   return axiosInstance.get(`/user/getEvaluationUsers?page=${page}&&limit=${limit}&&searche=${searche}&&filter=${filter}`)
}

export const useEvaluationUsers =(props:Props)=> {
    return useQuery(['paginatedEvaluationUsers',props.page ,props.key], () => PaginatedUsers(props), {
         select: (data) => {console.log(data.data,"E");return data.data},
        
    })
}