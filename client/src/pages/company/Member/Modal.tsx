import React, { SetStateAction } from 'react'
import { User } from './types'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../components/CustomInput'
import { textValidation } from '../../../utils/InputValidations'
import CustomButton from '../../../components/CustomButton'
import { useMutation, useQueryClient,} from '@tanstack/react-query'
import axiosInstance from '../../../utils/interceptor'
import { MutationError } from '../../../types'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type Props = {
    open:boolean,
    setOpen:React.Dispatch<SetStateAction<boolean>>
    user:User
    page:number

}

const Modal = ({open,setOpen,user,page}: Props) => {
    const client=useQueryClient()
      
    const form=useForm<User>({
        defaultValues:{
            firstName:user.firstName,
            lastName:user.lastName
        }
    })


    const { register, handleSubmit, formState,reset } = form;
    const { errors,isDirty,isValid ,isSubmitting} = formState;

    const {mutate,isLoading}=useMutation((data:User)=>axiosInstance.put(`user/editNames`,data),
    {
        onSuccess:(data)=>{
           
            client.invalidateQueries(['paginatedUsers',page])
            reset()
            setOpen(false)
        

        },
        onError:(err:AxiosError<MutationError>)=>{
            const errorMessage=err.response?.data.msg? err.response.data.msg:err.message 
            toast.error(errorMessage||"Something went wrong");
        }
    })
    const onSubmit =async (data: User) =>{
        const bodyData={
            ...data,
            _id:user._id
        }
        mutate(bodyData)
    }
 
  return (
 
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white min-w-[300px] min-h-[325px] flex flex-col  rounded-lg shadow-md">
              <div className="text-lg font-semibold mb-4 p-2 text-white bg-brightRed flex justify-between ">
                  <div>Edit User</div>
                  <button type="button" onClick={()=>{setOpen(false)}} className='hover:bg-darkRed px-1 rounded-full' >x</button>
                  </div>
             <div className='flex  flex-col justify-between'>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-2 p-2 flex flex-col justify-between'>
              <div className=''>
              <   CustomInput<User> title={"First Name"} type={"text"} rules={textValidation("First Name")} name={`firstName`} placeholder={"Enter First Name"} errors={errors?.firstName} register={register}/>
                  <CustomInput<User> title={"Last Name"} type={"text"} rules={textValidation("Last Name")} name={`lastName`} placeholder={"Enter Last Name"} errors={errors?.lastName} register={register}/>
              </div>
              <CustomButton text="Submit" type="submit" disabled={!isDirty|| !isValid} isLoading={isSubmitting ||isLoading} className='btn btn-primary  btn-sm' />
              </form>
             </div>
            </div>
          </div>
        
  )
}

export default Modal