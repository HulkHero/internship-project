import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useAppSelector } from '../../../../redux/hooks';
import { authSelector } from '../../../../redux/slices/authSlice';
import axiosInstance from '../../../../utils/interceptor';
import Button from '../../../../components/Button';
import {AiOutlineUserAdd} from "react-icons/ai"
import CustomInput from '../../../../components/CustomInput';
import { emailValidation, passwordValidation, textValidation } from '../../../../utils/InputValidations';
import useFetch from '../../../../hooks/useFetch';
import CustomButton from '../../../../components/CustomButton';
interface IAddMember{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    companyName:string,
    systemRole:string,
    techRole:string[]
}

interface IRole{
    roles:string[]
}


const AddMember = () => {
     const {_id,token}=useAppSelector(authSelector)
     const [error,setError]=React.useState<string>("")
     const [loading,setLoading]=React.useState<boolean>(false)
    //  const [roles,setRoles]=React.useState<string[]>([])
 
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

    

    const { register, handleSubmit, formState } = form;
    const { errors,isDirty,isValid ,isSubmitting,isSubmitSuccessful} = formState;
    useEffect(() => {
        if (isSubmitSuccessful) {
            form.reset();
        }
    }, [isSubmitSuccessful]);
    const onSubmit =async (data: IAddMember) =>{
      setLoading(true)
      axios.post(`http://localhost:5000/user/addMember/${_id}`,data,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      }).then((res)=>{
        setLoading(false)

      }).catch((err)=>{
        console.log(err)
        setError(err.response.data.msg)
        setLoading(false)
      })
    }
    const {data:roles,error:errorMessage,isLoading}=useFetch<string[]>({endPoint:"/kpi/get",params:`?companyName=${companyName}`})
    return (
        <div className=" flex  justify-center w-full">
            <div className="bg-white p-4 rounded-md  w-full">
                <div className="text-3xl font-bold text-center mb-4 ">AddMember</div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <CustomInput<IAddMember> title={"First Name"} type={"text"} rules={textValidation("First Name")} name={`firstName`} placeholder={"Enter First Name"} errors={errors?.firstName} register={register}/>
                        <CustomInput<IAddMember> title={"Last Name"} type={"text"} rules={textValidation("Last Name")} name={`lastName`} placeholder={"Enter Last Name"} errors={errors?.lastName} register={register}/>
                        <CustomInput<IAddMember> title={"Email"} type={"email"} rules={emailValidation()} name={`email`} placeholder={"Enter Email"} errors={errors?.email} register={register}/>
                        <CustomInput<IAddMember> title={"Password"} type={"password"} rules={passwordValidation()} name={`password`} placeholder={"Enter Password"} errors={errors?.password} register={register}/>
                        <div className="">
                            <label htmlFor="systemRole" className="w-1/3 flex items-center font-bold">
                                Role
                            </label>
                            <select
                
                                id="systemRole"
                                {...register("systemRole",{
                                    required:"Role is required",
                                    validate:(value)=>value.trim().length>3}
                                )}
                                className="border rounded p-2 w-2/3"
                            >
                              <option value="manager">Manager</option>
                              <option value="employee">Employee</option>
                              </select>
                            <br></br>
                            <p>{errors.systemRole?.message}</p>
                        </div>
                        <div className="">
                            <label htmlFor="techRole" className=" flex items-center  font-bold">
                                Tech Role
                            </label>
                            <select
                                id="techRole"
                                placeholder='Select Role'
                                {...register("techRole",{
                                    required:"Company Name is required",
                                    // validate:(value)=>value.trim().length>3}
                                        
                                })}
                                className="border rounded p-2 w-2/3"
                            >
                                {
                                   roles && roles.map((role:string,index:number)=>{
                                        return(
                                            <option key={index} value={role}>{role}</option>
                                        )
                                    })
                                }
                                </select>
                            <br></br>
                            <p>{errors.techRole?.message}</p>
                        </div>
                        <div className="flex justify-center text-white">
                            <CustomButton text="Add Member" type="submit" className='btn-primary btn-wide btn-sm' disabled={!isDirty|| !isValid } isLoading={isSubmitting } icon={<AiOutlineUserAdd size={"1rem"} className='fill-white stroke-2 stroke-slate-400'/>}></CustomButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    };

export default AddMember;
