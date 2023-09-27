import React from 'react'
import {  useAppSelector } from "../../../state/redux/hooks";
import { userSelector } from "../../../state/redux/slices/userSlice";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userSignUp } from '../../../types';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';

const PaymentSuccess = () => {
        const user = useAppSelector(userSelector);
        const navigate=useNavigate();
        const [data,setData]=React.useState<userSignUp>();

        const {mutate,isLoading}=useMutation((data:userSignUp)=>axios.post(`http://localhost:5000/user/signup`,data),{
            onSuccess:(data)=>{
                navigate("/login");
            },
            onError:(err)=>{
                toast.error("Something went wrong")
            }

        })

        const getData=async()=>{
        const da=sessionStorage.getItem("user") || ""
        const parsedData=await JSON.parse(da);
         setData(parsedData);
         console.log(parsedData,"parsedData");
            mutate(parsedData);
    }
    React.useEffect(() => {
        localStorage.removeItem("user");
        getData();

       
    }, []);
  return (
    <>
    <div className='h-screen bg-dark flex items-center justify-center text-white'>
        <ToastContainer/>
        <div className='bg-ligtDark min-w-[300px] min-h-[320px] flex flex-col justify-center rounded-lg shadow-md  p-10'>
            <div className='text-success text-center text-4xl font-semibold '>
                Payment Successfull
            </div>
            <div className='text-info text-center my-4 '>
                Navigating to Login
            </div>
            <div className='mx-auto'>
              {isLoading? <span className='loading text-center mx-auto loading-dots w-16 my-4'></span>:null}
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentSuccess