import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addUser, authSelector } from "../../../redux/slices/authSlice";
import { userSignUp } from '../../../types';
import { error } from 'console';
import axios from 'axios';
import CustomInput from '../../../components/CustomInput';
import { emailValidation, passwordValidation, textValidation } from '../../../utils/InputValidations';

interface ILogin {
    email: string;
    password: string;
}



const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ILogin>({
      defaultValues: {
          email: "",
          password: "",
      }
  });

  const { register, handleSubmit, formState :{errors} } = form;
  
  
  const onSubmit =async (data: ILogin) =>{
      

    axios.post("http://localhost:5000/user/login",data).then((res)=>{
        console.log(res,"res");
        localStorage.setItem("user",JSON.stringify(res.data.user));
      
        dispatch(addUser(res.data.user));
        navigate("/company");
        
    }).catch((err)=>{
        console.log(err,"err");
    })
        
  }
  return (
    <div className='bg-slate-200 h-screen flex justify-center items-center'>
    <div className='bg-white rounded-xl  space-y-4 max-w-screen-md mx-auto min-h-[50vh] w-[700px] flex flex-col item-center'>
      <div className='text-center p-4 text-4xl'>
        Login
      </div>
      <div className='flex flex-col gap-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 space-y-5'>
          <CustomInput<ILogin> title="Email" name="email" type={"email"} placeholder='Enter Email'  register={register} rules={textValidation("Email")} errors={errors.email}/>
          <CustomInput<ILogin> title="Password" name="password" type={"password"} placeholder='Enter Password'  register={register} rules={passwordValidation()} errors={errors.password}/>
          
          <button type="submit" className="bg-blue-500 px-4 py-1 rounded-lg w-1/2 self-center " >Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login