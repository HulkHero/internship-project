import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axiosInstance from '../utils/interceptor'
import {User} from "../pages/Company/Member/types"
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
    return useQuery(['paginatedUsers',props.page ,], () => PaginatedUsers(props), {
         select: (data) => {console.log(data.data,"h");return data.data},
        
    })
}

//mutation

interface IChangeRole{
    _id:string
    systemRole:string
    page:number,
    setSelectedOption:React.Dispatch<React.SetStateAction<string>>

}
interface OldData{

   data:{ data:User[]
    hasMore:boolean
    page:number
    total:number
   }
}


const changeRole = async ({page,_id,systemRole}:IChangeRole) => {
   return axiosInstance.put(`/user/changeSystemRole`,{systemRole,_id})
}



export const useChangeRole = () => {
    const queryClient = useQueryClient()
    return useMutation(changeRole, {
        onMutate: async ({page,_id,systemRole}) => {

          await queryClient.cancelQueries(['paginatedUsers',page])

           const oldData= queryClient.getQueryData<OldData|undefined>(['paginatedUsers',page])
           let oldSystemRole=""
           const updatedData=oldData?.data.data.map(user=>{
                if(user._id===_id){
                    oldSystemRole=user.systemRole
                     return {...user,systemRole}
                }
                return user
           })

           if(updatedData){
            queryClient.setQueryData(['paginatedUsers',page],oldData)
           }

              return {oldData,oldSystemRole}
        

        },
        onError: (error, {setSelectedOption,page,_id,systemRole},context) => {

            queryClient.setQueryData(['paginatedUsers',page], context?.oldData)
          
            // setSelectedOption(context?.oldSystemRole||"")
            

        },
        onSettled: (data,error,{page}) => {
            queryClient.invalidateQueries(['paginatedUsers',page])
        }

    })
}