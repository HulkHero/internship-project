import React,{memo} from 'react'
import { FieldError,FieldValues,UseFormRegister,UseControllerProps, Path } from 'react-hook-form';
interface Props<T extends FieldValues> extends UseControllerProps<T> {
    title:string,
    errors: FieldError|undefined,
    type:string,
    placeholder:string,
    register: UseFormRegister<T>,
    rules?:object,
}

const CustomInput =<T extends {}> (props:Props<T>) => {

    const {register,type,title,name,placeholder,errors,rules }=props
  return (
    <div className="mb-3">
    <label className="block font-bold">{title}:</label>
    <input
        type={type}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
        placeholder={placeholder}
         {...register(`${name}` as Path<T>,rules)}
    />
    {errors && <p className="text-red-500 mt-1">{errors.message}</p>}
</div>
  )
}

export default memo(CustomInput) as typeof CustomInput;