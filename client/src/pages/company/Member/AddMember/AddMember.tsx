import React from 'react';
import {  useForm } from 'react-hook-form';
import  { AxiosError } from 'axios';
import { useAppSelector } from '../../../../state/redux/hooks';
import { authSelector } from '../../../../state/redux/slices/authSlice';
import axiosInstance from '../../../../utils/interceptor';
import {AiOutlineUserAdd} from "react-icons/ai"
import CustomInput from '../../../../components/CustomInput';
import { emailValidation, passwordValidation, textValidation } from '../../../../utils/InputValidations';
import CustomButton from '../../../../components/CustomButton';
import openModal from '../../../../utils/handleModal';
import Modal from '../../../../components/Modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MutationError } from '../../../../types';
import { IAddMember } from './types';

const AddMember = () => {
     const {_id,}=useAppSelector(authSelector)
     const [error,setError]=React.useState<string>("")

 
     const {companyName} = JSON.parse(localStorage.getItem("user")||"")
    const form = useForm<IAddMember>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            companyName: companyName,
            systemRole:"employee",
            techRole:[""]
        },
        mode:"all"
    });

    const { register, handleSubmit, formState,reset } = form;
    const { errors,isDirty,isValid ,isSubmitting} = formState;

    const {mutate,isLoading:loadingMuation}=useMutation((data:IAddMember)=>axiosInstance.post(`user/addMember/${_id}`,data),
        {
            onSuccess:(data)=>{
                openModal("success")
                reset()
            },
            onError:(err:AxiosError<MutationError>)=>{
                const errorMessage=err.response?.data.msg? err.response.data.msg:err.message 
                setError(errorMessage||"something went wrong")
                openModal("error")
            }
        })
        const onSubmit =async (data: IAddMember) =>{
            mutate(data)
        }

    const {data:roles,isLoading,isError}=useQuery(['getRoles'],()=>{
        return axiosInstance.get('/kpi/get')
    },{select:(data)=>data.data.roles})

    return (
        <div className=" flex  justify-center w-full">
            <Modal variant='success' title="Member Added" description="Member Added Successfully" />
            <Modal variant='error' title={"Failed"} description={error}  ></Modal>
            <div className="bg-white p-4 rounded-md  w-full">
                <div className="text-3xl font-bold text-center mb-4 ">AddMember</div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <CustomInput<IAddMember> title={"First Name"} type={"text"} rules={textValidation("First Name")} name={`firstName`} placeholder={"Enter First Name"} errors={errors?.firstName} register={register}/>
                        <CustomInput<IAddMember> title={"Last Name"} type={"text"} rules={textValidation("Last Name")} name={`lastName`} placeholder={"Enter Last Name"} errors={errors?.lastName} register={register}/>
                        <CustomInput<IAddMember> title={"Email"} type={"email"} rules={emailValidation()} name={`email`} placeholder={"Enter Email"} errors={errors?.email} register={register}/>
                        <CustomInput<IAddMember> title={"Password"} type={"password"} rules={passwordValidation()} name={`password`} placeholder={"Enter Password"} errors={errors?.password} register={register}/>
                        <div className='flex flex-col sm:flex-row gap-5'>
                        <div className="mb-3 sm:w-1/2">
                            <label htmlFor="systemRole" className="block font-bold">
                                Role
                            </label>
                            <select
                                id="systemRole"
                                {...register("systemRole",{
                                    required:"Role is required",
                                    validate:(value)=>value.trim().length>3}
                                )}
                                className="w-full border rounded-md text-black mt-1 p-2 focus:outline-none focus:ring focus:border-blue-500"
                            >
                              <option value="manager">Manager</option>
                              <option value="employee">Employee</option>
                              </select>
                            <br></br>
                            <p>{errors.systemRole?.message}</p>
                        </div>
                        <div className="mb-3 sm:w-1/2">
                            <label htmlFor="techRole" className="block font-bold">
                                Tech Role
                            </label>
                            <select
                                id="techRole"
                                placeholder="Select Tech Role"
                                {...register("techRole",{
                                    required:"tech Role is required",
                                })}
                                className="w-full border rounded-md text-black mt-1 p-2 focus:outline-none focus:ring focus:border-blue-500"
                            >    
                                {
                                   roles && roles.map((role:string,index:number)=>{
                                        return(
                                            <option key={index} value={role}>{role}</option>
                                        )
                                    })
                                }
                                </select>
                                {isLoading ? <p>Loading...</p>
                                :isError ?<p className='text-red-500'>Error fetching Roles</p>:null
                               }
                            <br></br>
                            <p className='text-red-500'>{errors.techRole?.message}</p>
                        </div>
                        </div>
                        <div className="flex justify-center text-white pb-10 ">
                            <CustomButton text="Add Member" type="submit" className='btn-primary btn-wide btn-sm' disabled={!isDirty|| !isValid} isLoading={isSubmitting ||loadingMuation} icon={<AiOutlineUserAdd size={"1rem"} className='fill-white stroke-2 stroke-slate-400'/>}></CustomButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    };

export default AddMember;
