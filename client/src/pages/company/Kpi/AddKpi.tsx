
import axiosInstance from '../../../utils/interceptor'
import Inputs from './Inputs'
import { useState} from 'react'
import { useForm ,useFieldArray } from 'react-hook-form'
import { useAppSelector } from '../../../redux/hooks'
import { authSelector } from '../../../redux/slices/authSlice'
import openModal from '../../../utils/handleModal'
import Modal from '../../../components/Modal'
import CustomInput from '../../../components/CustomInput'
import { IForm,SForm } from './types'


const AddKpi = () => {
    const {companyName}=useAppSelector(authSelector)
    const [err,setErr]=useState("")
    const [modalErr,setModalErr]=useState("")

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
    const {register,control,handleSubmit,formState:{errors,isSubmitting},getValues,reset}=form
    const {fields,append,remove}=useFieldArray({
        name:"kpis",
        control,     
    })

    const onSubmit=(data:IForm)=>{
        const weightage=getValues("kpis").reduce((acc,curr)=>acc+curr.kpiWeight,0)
        console.log(weightage,"submission")
        if(weightage!==100){
            setErr("Total weightage should be 100")
            return
        }
        setErr("")
        axiosInstance.post("/kpi/add",{...data,companyName}as SForm).then((res)=>{
           openModal("success")
           reset({
            techRole:"",
            kpis:[{
                kpiName:"",
                kpiWeight:0,
                kpiThreshold:0
            }],
           })
        }).catch((err)=>{
            setModalErr(err.response?.data.msg)
            openModal("error")
        })

    }
    
    const [toggle,setToggle]=useState(fields[0].id)

    const toggleForm=(index:string)=>{
        setToggle(index)
    }  
  return (
    <div className=' space-y-3 p-3'>
        <Modal variant='success' title="Kpi Added" description="Kpi Added Successfully" />
        <Modal variant='error' title={"Error"} description={modalErr}  ></Modal>
        <div className='flex  '>
            <h1 className='font-semibold text-2xl'>Kpi schema</h1>
        </div>

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <CustomInput<IForm> title={"Tech Role"} type={"text"} rules={{required:"Role is required",minLength:{value:3,message:"Min length is 3"},maxLength:{value:20,message:"Max length is 20"}}} name={"techRole"} placeholder={"Enter Role"} errors={errors?.techRole} register={register}/>
                </div>
                <div>
                    {err && <p className="text-red-500">{err}</p>}
                </div>
                <div className='flex my-3'>
                    <div className="flex ">
                        {
                        fields.map((item,index)=>{
                            return(
                                   <div className='relative flex'>
                                   { errors?.kpis &&  errors.kpis[index] ? <span className='absolute top-2 left-2 h-2 w-2 rounded-full bg-red-700  '/>:null}
                                   <button type={"button"} onClick={(e)=>{e.stopPropagation(); toggleForm(item.id)}} className={`btn ${ toggle===item.id?"btn-primary":"bg-gray-300"} btn-circle`}>Kpi</button>
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
                            <Inputs key={item.id} id={item.id} toggle={toggle}  index={index} remove={remove} register={register} errors={errors}  />
                        )
                    })
                }
            <button type="submit" disabled={isSubmitting} className='disabled:loading-dots btn btn-primary btn-sm btn-wide' >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddKpi