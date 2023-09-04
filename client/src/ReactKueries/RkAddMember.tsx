import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'
import axios from 'axios'

interface Itype{
    _id:string,
    token:string
}


const AddMember = ({_id, token}:Itype) => {
    return axios.get(`http`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const useAddMember = ({_id, token}:Itype) => {
    return useQuery(['addMember'], () => AddMember({_id, token}), {
        select: (data) => data.data
    })
}