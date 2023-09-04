import React from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addUser, userSelector } from "../redux/slices/userSlice";
import { userSignUp } from '../types';


const Signup = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);
    const form = useForm<userSignUp>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            companyName: "",
            tier: "basic",
        }
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const onSubmit =async (data: userSignUp) =>{
        dispatch(addUser(data));
        sessionStorage.setItem("user",JSON.stringify(data));

        const stripe = await loadStripe('pk_test_51Nj141DOsxvBXmWQhvQUIY7jmKLOVUSr8IimWuKhCmTjNTbKqxi3AJmmZfU8dPPbjHrTvqCFVvdLTfw6iTvoh4Is001jA7RoYU');
        let item={};
        if(data.tier==="basic"){
        item={
          name:"basic",
          price:15,
        }
            }
        else
        {
            item={
                name:"premium",
                price:30,
            }
        }
    
           
        const header={
          "Content-Type":"application/json"
        }
        console.log(item,"item");
        const response=await fetch("http://localhost:5000/create-checkout-session",{
          method:"POST",
          headers:header,
          body:JSON.stringify(item)
        })
        const result=await response.json();


         console.log(result,"result")
        const session=await stripe?.redirectToCheckout({
          sessionId:result.id
        })
        if(session?.error){
          console.log(session.error.message,"session.error.message");
        }
    }
    
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-96">
                <div className="text-3xl font-bold mb-4">Signup</div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <label htmlFor="firstName" className="w-1/3 flex items-center justify-end font-semibold">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register("firstName",{
                                    required:"First Name is required",
                                    validate:(value)=>value.trim().length>3
                                })}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p>{errors.firstName?.message}</p>

                        </div>
                        <div className="flex space-x-2">
                            <label htmlFor="lastName" className="w-1/3 flex items-center justify-end font-semibold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register("lastName",{
                                    required:"Last Name is required",
                                    validate:(value)=>value.trim().length>3
                                })}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p>{errors.lastName?.message}</p>
                        </div>
                        <div className="flex space-x-2">
                            <label htmlFor="email" className="w-1/3 flex items-center justify-end font-semibold">
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
                            <p>{errors.email?.message}</p>
                        </div>
                        <div className="flex space-x-2">
                            <label htmlFor="password" className="w-1/3 flex items-center justify-end font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password",{
                                    required:"Password is required",
                                    validate:(value)=>value.trim().length>6
                                })}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p>{errors.password?.message}</p>
                        </div>
                        <div className="flex space-x-2">
                            <label htmlFor="companyName" className="w-1/3 flex items-center justify-end font-semibold">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                {...register("companyName",{
                                    required:"Company Name is required",
                                    validate:(value)=>value.trim().length>3}
                                        
                                )}
                                className="border rounded p-2 w-2/3"
                            />
                            <br></br>
                            <p>{errors.companyName?.message}</p>
                        </div>
                        <div className="flex space-x-2">
                            <label htmlFor="tier" className="w-1/3 flex items-center justify-end font-semibold">
                                Tier
                            </label>
                            <select id="tier" {...register("tier")} className="border rounded p-2 w-2/3">
                                <option value="basic">Basic $15</option>
                                <option value="premium">Premium $30</option>
                            </select>
                        </div>
                        <div className='flex justify-evenly '>
                            <div className='min-h-[50px] bg-slate-200 p-4'>
                                <h1> Basic </h1>
                                <h1> 5 managers </h1>
                                <h1> 10 employees </h1>
                                <h1> costs : 15$ </h1>

                            </div>
                            <div className=' min-h-[50px] bg-slate-200 p-4'>
                                <h1> Premium </h1>
                                <h1> 15 managers </h1>
                                <h1> 30 employees </h1>
                                <h1> costs : 30$ </h1>
                            </div>
                           
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                checkout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    };

export default Signup;
