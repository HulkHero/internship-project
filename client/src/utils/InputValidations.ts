
export const textValidation =(name:string)=> {
   return{

         required: `${name} is required`,
            validate:{
                maxLength: (value:string)=> {
                    if(value.trim().length > 20)
                    {
                     return (`${name} must be less than 20 characters` )} 
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
              //eslint-disable-next-line
            value:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email",
    }
}
export const passwordValidation =()=> {
    return{
          
            required: `Password is required`,
            maxLength: { value: 20, message: `Password must be less than 20 characters` },
            minLength: { value: 6, message: `Password must be more than 6 characters` },
            validate:{
                maxLength: (value:string)=> {
                    if(value.trim().length < 20)
                    {
                     return (`Password must be less than 20 characters` )} 
                },
                minLength: (value:string)=> {
                    if(value.trim().length > 6)
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