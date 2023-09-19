import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'
interface Props{
    searchInputValue:string
    selectValue:string
    page:number
}
const PaginatedProjects=<T extends {}>(props:Props)=>{
   return axiosInstance.get<T>(`/project/paginatedProjects?page=${props.page}&&limit=${6}&&search=${props.searchInputValue}&&selected=${props.selectValue}`)
}

export const usePaginatedProjects =<T extends {}>(props:Props)=> {
    return useQuery(['PaginatedProjects',props.page ], () => PaginatedProjects<T>(props), {
         select: (data) => {return data.data}, 
    })
}