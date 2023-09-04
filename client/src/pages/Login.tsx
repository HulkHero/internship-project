import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addUser, authSelector } from "../redux/slices/authSlice";
import { userSignUp } from '../types';
import { error } from 'console';
import axios from 'axios';

interface ILogin {
    email: string;
    password: string;
}



const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<userSignUp>({
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
        <div className="flex relative flex-row justify-center   space-x-2 ">
                            <label htmlFor="email" className=" flex w-1/4 justify-center items-center font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email",{
                                    required:"Email is required",
                                    pattern:{
                                         //eslint-disable-next-line
                                        value:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email format",
                                    }
                                })}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p className='absolute -bottom-5'>{errors.email?.message}</p>
                        </div>
                        <div className="flex relative justify-center space-x-2">
                            <label htmlFor="password" className="flex w-1/4 justify-center items-center font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password",{
                                    required:"Password is required",
                                    validate:{
                                      length:(value)=>{
                                        if(value.trim().length<6){
                                          return "Password must be greater than 6 characters"
                                        }  
                                    }
                                    },
                                  
                                })}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p className='absolute -bottom-5 text-red-800'>{errors.password?.message}</p>
                        </div>
          <button type="submit" className="bg-blue-500 px-4 py-1 rounded-lg w-1/2 self-center " >Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login