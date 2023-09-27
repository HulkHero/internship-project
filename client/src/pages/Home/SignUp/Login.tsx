import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, } from "../../../state/redux/hooks";
import { addUser,} from "../../../state/redux/slices/authSlice";
import { MutationError,} from '../../../types';
import axios, { AxiosError } from 'axios';
import CustomInput from '../../../components/CustomInput';
import { emailSimple, passwordValidation } from '../../../utils/InputValidations';
import { useMutation } from '@tanstack/react-query';
import openModal from '../../../utils/handleModal';
import Modal from '../../../components/Modal';
import React, { useEffect } from 'react';
import CustomButton from '../../../components/CustomButton';


interface ILogin {
    email: string;
    password: string;
}



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage,setErrorMessage]=React.useState<string>("")
 
  const form = useForm<ILogin>({
      defaultValues: {
          email: "",
          password: "",
      }
  });

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/company/")
    }
  }, [])

  const { register, handleSubmit, formState :{errors} } = form;

  const {mutate,isLoading}=useMutation((data:ILogin)=>axios.post(`http://localhost:5000/user/login`,data),{
    onSuccess:(data)=>{
        localStorage.setItem("user",JSON.stringify(data.data.user));
        dispatch(addUser(data.data.user));
        navigate("/company/");
    },
    onError:(err:AxiosError<MutationError>)=>{

      const errMessage=err.response?.data.msg? err.response.data.msg:err.message
      setErrorMessage(errMessage||"Something went wrong")
      openModal("error")
       
    }
  })
  
  
  const onSubmit =async (data: ILogin) =>{

    mutate(data) 
        
  }
  return (
    <div className='bg-dark h-screen text-white text-opacity-80 flex flex-col sm:flex-row justify-center items-center gap-10'>
      <div className='w-full'>
          <div className='text-center text-4xl text-white font-bold'>Welcome to <span className='text-primary'>Assess Pro</span></div>
      </div>
    <div className='w-full mx-2 bg-ligtDark p-4 rounded-xl  space-y-4 max-w-screen-md min-h-[50vh] lg:w-[700px] flex flex-col item-center'>
      <div className='text-center p-4 text-4xl'>
        Login
      </div>
      <div className='flex flex-col gap-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 space-y-1'>
          <CustomInput<ILogin> title="Email" name="email" type={"email"} placeholder='Enter Email'  register={register} rules={emailSimple()} errors={errors.email}/>
          <CustomInput<ILogin> title="Password" name="password" type={"password"} placeholder='Enter Password'  register={register} rules={passwordValidation()} errors={errors.password}/>
          
          <CustomButton text="Login" type="submit" isLoading={isLoading} className='btn btn-primary btn-sm' />
        </form>
      </div>
    </div>
    <Modal variant='error' title={"Error"} description={errorMessage} ></Modal>
    </div>
  )
}

export default Login