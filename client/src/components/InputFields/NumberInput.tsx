
import React from 'react'
import { FieldErrors,FieldError, FieldValue, FieldValues, UseFormGetValues, UseFormRegister,UseControllerProps, Path } from 'react-hook-form';
interface Props<T extends FieldValues> extends UseControllerProps<T> {
    title:string,
    index: number,
    errors: FieldError|undefined,
    type:string,
    placeholder:string,
    register: UseFormRegister<T>,
    min?:number,
    max?:number,
}

const NumberInput =<T extends {}> (props:Props<T>) => {

    const {register,type,index,title,name,placeholder,errors,min,max }=props
  
  return (
    <div className="mb-3">
                <label className="block font-bold">{title}:</label>
                <input
                    type="number"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder={placeholder}
                    {...register(`${name}` as Path<T>, {
                        valueAsNumber: true,
                        required: 'Field is required',
                        min: {
                            value: min||"",
                            message: `Min value is ${min}`,
                        },
                        max: {
                            value: max||"",
                            message: `Max value is ${max}`,
                        },
                    })}
                />
                <p className="text-red-500 mt-1">{errors?.message}</p>
            </div>
  )
}

export default NumberInput