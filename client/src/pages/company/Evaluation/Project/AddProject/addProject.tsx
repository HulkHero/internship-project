import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../components/CustomInput';
import { textLongValidation, textValidation } from '../../../../../utils/InputValidations';
import  { ActionMeta, GroupBase } from 'react-select';
import AsyncSelect from 'react-select/async';
import axiosInstance from '../../../../../utils/interceptor';
import { toast,ToastContainer } from 'react-toastify';
import CustomButton from '../../../../../components/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MutationError } from '../../../../../types';
import { IAddProject,IOption,CustomOptionProps } from './types';
import { fetchOptions } from '../../../../../utils/fetchOptionsDebounce';

const CustomOption: React.FC<CustomOptionProps<IOption, true, GroupBase<IOption>>> = (props) => {
  return (
    <div className='flex flex-col bg-neutral-100 focus:bg-red-300 active:bg-red-400 cursor-pointer hover:bg-red-300 ' {...props.innerProps}>
      <div  className='text-md mb-0 pb-0'>{props.label}</div>
      <div className='text-xs pl-2 mt-0 pt-0 opacity-80' >{props.data.role}</div>
    </div>
  );
};

const AddProject: React.FC = () => {

  const [options, setOptions] = useState<{value:string}[]>([]);

  const form = useForm<IAddProject>({
      defaultValues: {
        projectName: "",
        projectDescription: "",
        teamName: "",
        projectMembers: [""],
        projectStartDate: new Date(),
        projectEndDate: new Date(),
      }
  }); 

  const { register, handleSubmit, formState, getValues ,reset,setError} = form;
  const { errors, } = formState;


  const onSubmit = async (data: IAddProject) => {
    if(options.length<2)
    {
     setError("projectMembers",{message:"Please select atleast two member"})
     toast.error("Please select atleast two member");
      return;
    }
   const bodyData={
     ...data,
     projectMembers:options.map((option)=>option.value)
   }
    mutate(bodyData)
  };

  const {mutate,isLoading,} = useMutation((data:IAddProject)=>axiosInstance.post('/project/add',data),{
    onSuccess:()=>{
      toast.success("Project Added Successfully");
      reset({
        projectName: "",
        projectDescription: "",
        teamName: "",
        projectMembers: [""],
        projectStartDate: new Date(),
        projectEndDate: new Date(),
      });
    },
    onError:(err:AxiosError<MutationError>)=>{
        toast.error(err.response?.data.msg||"Something went wrong");
    }
  });

  const onChange = (option: readonly IOption[], actionMeta: ActionMeta<IOption>) => {
      setOptions(option as IOption[]);
  }  
  return (
    <div className='p-3 ' >
      <ToastContainer></ToastContainer>
        <div>
            <h1 className='text-2xl text-center text-textDark font-bold'>Add Project</h1>
        </div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
               <CustomInput<IAddProject> title="Project Name" name="projectName" type={"text"} placeholder='Enter Project Name'  register={register} rules={textValidation("Project Name")} errors={errors.projectName}/>
                </div>
                <div>
               <CustomInput<IAddProject> title="Project Description" name="projectDescription" type={"text"} placeholder='Enter Project Description'  register={register} rules={textLongValidation("Project Description")} errors={errors.projectDescription}/>
                </div>
                <div>
                  <CustomInput<IAddProject> title="Team Name" name="teamName" type={"text"} placeholder='Enter Team Name'  register={register} rules={textValidation("Team Name")} errors={errors.teamName}/>
                </div>
                <CustomInput<IAddProject> title="Start Date" name="projectStartDate" type={"date"} placeholder='Enter Project Manager'  register={register} rules={{
                    valueAsDate:true,
                    required:"Project Start Date is required"
                }} errors={errors.projectStartDate}/> 
           <CustomInput<IAddProject> title="End Date" name="projectEndDate" type={"date"} placeholder='Enter Project End Date'  register={register} rules={{
                    valueAsDate:true,
                    validate:{
                        range:(v:Date)=>{
                            const startValue = getValues("projectStartDate");
                            if(v<startValue)
                            {
                                 return "Project End Date must be greater than Project Start Date"
                            }
                        }
                    },
                    required:"Project End Date is required"
                }} errors={errors.projectEndDate}/> 
            <div>
              <label className='font-bold text-md'>Team Members</label>
              <AsyncSelect<IOption, true, GroupBase<IOption>>
                  components={{ Option: CustomOption}}
                  cacheOptions={true}
                  name="projectMembers"
                  onChange={onChange}
                  isMulti={true}
                  loadOptions={fetchOptions<IOption>}
                      />
              {errors.projectMembers && <p className="text-red-700">{errors.projectMembers.message}</p>}
            </div>
            <div className='my-2'>
            <CustomButton text="Submit" disabled={isLoading} className={'btn-primary'} isLoading={isLoading} type="submit" />
            </div>
            </form>        
        </div>
    </div>
  )
}

export default AddProject