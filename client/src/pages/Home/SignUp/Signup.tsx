import React from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from "../../../state/redux/hooks";
import { addUser, userSelector } from "../../../state/redux/slices/userSlice";
import { userSignUp } from '../../../types';
import CustomInput from '../../../components/CustomInput';
import { emailSimple, passwordValidation, textValidation } from '../../../utils/InputValidations';
import CustomButton from '../../../components/CustomButton';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import HomeButton from './HomeButton';


const Signup = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);
    const [selectedTier, setSelectedTier] = React.useState<string>("basic");
    const [loading, setLoading] = React.useState<boolean>(false);
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
        setLoading(true);
       

        const res= await axios.get(`http://localhost:5000/user/getCompanyName/${data.companyName}`)
        console.log(res.data.companyName,"res.data")
        if(res.status===200&&res.data.companyName){
            toast.error("Company Name already exists")
            setLoading(false);
            return
        }
        const newData={
            ...data,
            tier:selectedTier
        }
    
        dispatch(addUser(newData));
        sessionStorage.setItem("user",JSON.stringify(newData));

        const stripe = await loadStripe('pk_test_51Nj141DOsxvBXmWQhvQUIY7jmKLOVUSr8IimWuKhCmTjNTbKqxi3AJmmZfU8dPPbjHrTvqCFVvdLTfw6iTvoh4Is001jA7RoYU');
        let item={};
        if(selectedTier==="basic"){
        item={
          name:"basic",
          price:150,
        }
            }
        else
        {
            item={
                name:"premium",
                price:300,
            }
        }
        const header={
          "Content-Type":"application/json"
        }
        console.log(item,"item");
        const response=await fetch("http://localhost:5000/user/payment",{
          method:"POST",
          headers:header,
          body:JSON.stringify(item)
        })
        const result=await response.json();

        const session=await stripe?.redirectToCheckout({
          sessionId:result.id
        })
        setLoading(false);
        if(session?.error){
          console.log(session?.error.message,"session.error.message");
        }
    }
    
    return (
        <div className="min-h-screen  flex flex-col sm:flex-row justify-center items-center gap-10 text-white text-opacity-80 bg-dark">
           <div className='absolute bg-lightDark shadow-md hover:bg-darkRed p-1 rounded-md  top-5 left-7'>
           <HomeButton></HomeButton>
           </div>
         <div className='w-full max-sm:pt-14'>
          <div className='text-center max-[600px]:mt-2  text-4xl text-white font-bold'>Welcome to <span className='text-primary'>Assess Pro</span></div>
            </div>
            <div className="w-full bg-ligtDark p-4 shadow-md rounded-md">
                <div className="text-3xl font-bold mb-4">Signup</div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-3">
                        <div className='flex justify-between gap-5 '>
                        <CustomInput<userSignUp> type="text" title='First Name' placeholder='Enter Your Name' register={register} rules={textValidation("First Name")} name="firstName" errors={errors?.firstName} ></CustomInput>
                         <CustomInput<userSignUp> type="text" title='Last Name' placeholder='Enter Your Name' register={register} rules={textValidation("Last Name")} name="lastName" errors={errors.lastName} ></CustomInput>
                        </div>
                        <CustomInput<userSignUp> type="email" title='Email' placeholder='Enter Your Email' register={register} rules={emailSimple()} name="email" errors={errors.email} ></CustomInput>
                        <CustomInput<userSignUp> type="password" title='Password' placeholder='Enter Your Password' register={register} rules={passwordValidation()} name="password" errors={errors.password} ></CustomInput>
                        <CustomInput<userSignUp> type="text" title='Company Name' placeholder='Enter Your Company Name' register={register} rules={textValidation("Company Name")} name="companyName" errors={errors.companyName} ></CustomInput>
                        <div className='flex justify-evenly py-2'>
                            <div onClick={()=>setSelectedTier("basic")} className={`${selectedTier ==="basic"?"bg-brightRed ring-2 ring-darkRed":"bg-darkRed "}  min-h-[50px] rounded-md shadow-md p-4 cursor-pointer`}>
                                <h1> Basic </h1>
                                <h1> 15 managers </h1>
                                <h1> 50 employees </h1>
                                <h1> costs : 150$ </h1>

                            </div>
                            <div onClick={()=>setSelectedTier("premium")} className={` ${selectedTier ==="premium"?"bg-brightRed ring-2 ring-darkRed":"bg-darkRed "}  min-h-[50px] bg-brigRed rounded-md shadow-md p-4 cursor-pointer`}>
                                <h1> Premium </h1>
                                <h1> 30 managers </h1>
                                <h1> 100 employees </h1>
                                <h1> costs : 300$ </h1>
                            </div>
                           
                        </div>
                        <div className="flex justify-center mt-4">
                            <CustomButton
                                type="submit"
                                text="Go to Payment"
                                isLoading={loading}
                                className="btn btn-primary btn-sm btn-wide"
                            />
                        </div>
                    </div>
                </form>
            <ToastContainer theme={'colored'} transition={Slide}></ToastContainer>
            </div>
        </div>
    )};
export default Signup;
