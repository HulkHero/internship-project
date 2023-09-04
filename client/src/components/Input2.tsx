
import React from 'react'
import { FieldErrors,FieldError, FieldValue, FieldValues, UseFormGetValues, UseFormRegister,UseControllerProps, Path } from 'react-hook-form';
interface Props<T extends FieldValues> extends UseControllerProps<T> {
    title:string,
    index: number,
    errors: FieldError|undefined,
    type:string,
    placeholder:string,
    register: UseFormRegister<T>,
}

const Input2 =<T extends {}> (props:Props<T>) => {

    const {register,type,index,title,name,placeholder,errors,...refe }=props
  
  return (
    <div className="mb-3">
    <label className="block font-bold">{title}:</label>
    <input
        type={type}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
        placeholder={placeholder}
         {...register(`${name}` as Path<T>,{
            required:"field is rekuired",
            minLength:{
                value:3,
                message:"Filed should be 3"
            }
         })}
    />
    {errors && <p className="text-red-500 mt-1">{errors.message}</p>}
</div>
  )
}

export default Input2