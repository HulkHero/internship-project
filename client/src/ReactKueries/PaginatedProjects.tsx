import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'
interface Props{
    page:number
}
const PaginatedProjects=<T extends {}>(page:number)=>{
   return axiosInstance.get<T>(`/project/paginatedProjects?page=${page}&&limit=6`)
}

export const usePaginatedProjects =<T extends {}>(page:number)=> {
    return useQuery(['PaginatedProjects',page ], () => PaginatedProjects<T>(page), {
         select: (data) => {console.log(data); return data.data}, 
    })
}