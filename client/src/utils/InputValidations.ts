import axios from 'axios';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import debounce from 'lodash.debounce';
export const textValidation =(name:string)=> {
   return{

         required: `${name} is required`,
            validate:{
                maxLength: (value:string)=> {
                    if(value.trim().length > 50)
                    {
                     return (`${name} must be less than 50 characters` )} 
                },
                minLength: (value:string)=> {
                    if(value.trim().length < 2)
                    {
                     return (`${name} must be more than 3 characters` )} 
                }
            }
   }
}
export const textLongValidation =(name:string)=> {
    return{
 
          required: `${name} is required`,
             validate:{
                 maxLength: (value:string)=> {
                     if(value.trim().length > 100)
                     {
                      return (`${name} must be less than 100 characters` )} 
                 },
                 minLength: (value:string)=> {
                     if(value.trim().length < 2)
                     {
                      return (`${name} must be more than 3 characters` )} 
                 }
             }
    }
 }

export const emailValidation =()=> {
    return{
            required: `Email is required`,
            pattern:{
            //eslint-disable-next-line
            value:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email",
            },
            validate:{
                unikue:async(value:string)=> {
                       //sends rekuest only when email is valid                  
                        const res=await axios.get(`http://localhost:5000/user/checkEmail/${value}`)
                        console.log(res.data)
                        if(res?.data?.length>0)
                        {
                         return (`Email already exists` )
                        }else{
    
                        }  
                                    
                }
            }
    }
}
export const passwordValidation =()=> {
    return{
          
            required: `Password is required`,
            maxLength: { value: 20, message: `Password must be less than 20 characters` },
            minLength: { value: 6, message: `Password must be more than 6 characters` },
            validate:{
                maxLength: (value:string)=> {
                    if(value.trim().length > 20)
                    {
                     return (`Password must be less than 20 characters` )} 
                },
                minLength: (value:string)=> {
                    if(value.trim().length < 6)
                    {
                     return (`Password must be more than 6 characters` )}
                }
            }
    }
}
export const confirmPasswordValidation =()=> {
    return{
            required: `Confirm Password is required`,
            maxLength: { value: 20, message: `Confirm Password must be less than 20 characters` },
            minLength: { value: 6, message: `Confirm Password must be more than 6 characters` },
    }
}

export const numberValidation =(min:number,max:number)=> {
    return{
            valueAsNumber:true,
            required: `required`,
            min: { value: min, message: `Number must be more than ${min}` },
            max: { value: max, message: `Number must be less than ${max}` },
    }
}