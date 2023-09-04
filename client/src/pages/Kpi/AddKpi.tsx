
import axiosInstance from '../../utils/interceptor'
import Inputs from './Inputs'
import {useEffect, useState} from 'react'
import { useForm ,useFieldArray, FieldErrors, set } from 'react-hook-form'
import { useAppSelector } from '../../redux/hooks'
import { authSelector } from '../../redux/slices/authSlice'

interface Ikpi{
    kpiName:string,
    kpiWeight:number,
    kpiThreshold:number,
}

interface IForm {
    techRole:string,
    kpis:Ikpi[]
}

interface SForm extends IForm{
    companyName:string
}
const AddKpi = () => {
    const {companyName}=useAppSelector(authSelector)
    let err;
    const form=useForm<IForm>({
        defaultValues:{
            techRole:"",
            kpis:[{
                kpiName:"",
                kpiWeight:0,
                kpiThreshold:0
            }],
        },
    })
    const {register,control,handleSubmit,formState:{errors},getValues,watch}=form
  
    const {fields,append,remove}=useFieldArray({
        name:"kpis",
        control,

     
    })
    const value=watch("kpis").reduce((acc,curr)=>acc+curr.kpiWeight,0)
    if(value>100){
        err="Total weightage should not  be greater than 100"
    }
    else{
        err=""
    }

    const onSubmit=(data:IForm)=>{
        console.log(data)
        console.log(value,"submission")
        if(value!==100){
            err="Total weightage should be 100"
            return
        }
        
        axiosInstance.post("/kpi/add",{...data,companyName}as SForm).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)    
        })

    }
    const onError=(errors:FieldErrors<IForm>)=>{
        console.log(errors,"errors")
    }
    console.log("rendered")

    const [toggle,setToggle]=useState(fields[0].id)

    const toggleForm=(index:string)=>{
        setToggle(index)
    }  
  return (
    <div className=' space-y-3 p-3'>
        <div className='flex  '>
            <h1 className='font-semibold text-2xl'>Kpi schema</h1>
        </div>
       
        <div>
            <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div>
                <label>
                    Role:
                </label>
                <input type="text" className='bg-gray-200' placeholder="Role" {...register("techRole",{
                    required:"Role is required",
                    minLength:{
                        value:3,
                        message:"Min length is 3"
                    },
                    maxLength:{
                        value:20,
                        message:"Max length is 20"
                    }
                })} />
            </div>
             <div>
                {
                    err && <p className="text-red-500">{err}</p>
                }
             </div>
           <div className='flex my-3'>
            <div className="flex ">
                 {
                    fields.map((item,index)=>{
                        return(
                            <div className='relative flex'>
                            { errors?.kpis &&  errors.kpis[index] ? <span className='absolute top-2 left-2 h-2 w-2 rounded-full bg-red-700  '/>:null}
                            <button type="button"  className={`${toggle===item.id ?" bg-green-600 ":"bg-gray-300"} ml-2 px-3 py-1 rounded-xl`} onClick={(e)=>{e.stopPropagation(); toggleForm(item.id)}} >Kpi</button>
                            </div>
                        )
                    })
                 }
            </div>
            <div>
                <button type='button' className='ml-2 px-3 py-1 bg-gray-300 rounded-xl'  onClick={(e)=>{e.stopPropagation(); append({kpiName:"",kpiWeight:0,kpiThreshold:0})}}>+</button>
            </div>
            </div>
             {
                    fields.map((item,index)=>{
                        return(
                            <Inputs key={item.id} id={item.id} toggle={toggle}  index={index} remove={remove} register={register} errors={errors}  getValues={getValues} />
                        )
                    })
             }
            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddKpi