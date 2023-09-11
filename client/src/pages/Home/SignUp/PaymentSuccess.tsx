import React from 'react'
import {  useAppSelector } from "../../../redux/hooks";
import { userSelector } from "../../../redux/slices/userSlice";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userSignUp } from '../../../types';

const PaymentSuccess = () => {
const user = useAppSelector(userSelector);
      const [data,setData]=React.useState<userSignUp>();
    const getData=async()=>{
        const da=await sessionStorage.getItem("user") || ""
        const parsedData=await JSON.parse(da);
         setData(parsedData);
         console.log(parsedData,"parsedData");
        axios.post("http://localhost:5000/user/signup",parsedData).then((res)=>{
            console.log(res,"res");
        }).catch((err)=>{
            console.log(err,"err");
        })

    }
    React.useEffect(() => {
        getData();

        return () => {
            sessionStorage.removeItem("user");
        }

    }, []);
console.log(user,"user");
  return (
    <>
    <div>PaymentSuccess:{user.firstName}</div>
    <div>
        {
            data && <div>{data.firstName}</div>
        }
        <Link to="/login">Login Now</Link>
    </div>
    </>
  )
}

export default PaymentSuccess