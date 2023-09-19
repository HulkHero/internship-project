import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CustomInput from '../../../../../components/CustomInput';
import { textLongValidation, textValidation } from '../../../../../utils/InputValidations';
import OptionTypeBase, { ActionMeta, GroupBase, OptionProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import axiosInstance from '../../../../../utils/interceptor';
import { toast,ToastContainer } from 'react-toastify';
import CustomButton from '../../../../../components/CustomButton';

interface IAddProject {
  projectName: string;
  projectDescription: string;
  teamName: string;
  projectMembers: string[];
  projectStartDate: Date;
  projectEndDate: Date;
}

interface IOption extends OptionTypeBase {
  value: string;
  label: string;
  role: string;
}


  type CustomOptionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
    innerProps: React.HTMLProps<HTMLDivElement>;
    label: string;
   
  } & OptionProps<Option, IsMulti, Group>;
  

  const customStyles = {
    option: (provided:any, state:any) => ({
      ...provided,
      borderBottom: '4px dotted #ccc',
      color: state.isSelected ? '#fff' : '#000',
      backgroundColor: state.isSelected ? '#007bff' : '#fff',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#f2f2f2',
        color: state.isSelected ? '#fff' : '#ff0000',
      },
    }),
  };
const AddProject: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<{value:string}[]>([]);

const CustomOption: React.FC<CustomOptionProps<IOption, true, GroupBase<IOption>>> = (props) => {
    console.log(props.data?.role,"innerProps")
    return (
      <div className='flex flex-col bg-neutral-100  ' {...props.innerProps}>
        <div  className='text-md mb-0 pb-0'>{props.label}</div>
        <div className='text-xs pl-2 mt-0 pt-0 opacity-80' >{props.data.role}</div>
      </div>
    );
  };
  
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
  const { errors,isSubmitSuccessful, } = formState;

  const onSubmit = async (data: IAddProject) => {

    console.log(data);
    setIsLoading(true);
     if(options.length<2)
     {
      setError("projectMembers",{message:"Please select atleast two member"})

      //  alert("Please select atleast two member")
      toast.error("Please select atleast two member");
       setIsLoading(false);
       return;
     }
    const bodyData={
      ...data,
      projectMembers:options.map((option)=>option.value)
    }
   console.log(errors,"errors")
    axiosInstance.post('/project/add',bodyData).then((res)=>{
      setIsLoading(false);
    }).catch((err)=>{
      setIsLoading(false);
    })
  };

  const startValue = getValues("projectStartDate");

  useEffect(() => {
    if (isSubmitSuccessful===true) {
      reset({
        projectName: "",
        projectDescription: "",
        teamName: "",
        projectMembers: [""],
        projectStartDate: new Date(),
        projectEndDate: new Date(),
      });
    }
  }, [isSubmitSuccessful]);

  const fetchOptions = async (inputValue:string) => {
    try {
      const response = await axiosInstance.get(`/user/search/${inputValue}`);
      console.log(response.data,"response")
      const users = response.data.map((user: any) => ({
        value: user._id,
        label: `${user.firstName}  ${user.techRole}`,
      }));
      setOptions(users);
      return users;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
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
                            
                            if(v<startValue)
                            {
                           return "Project End Date must be greater than Project Start Date"
                        }
                        }
    
                    },
                    required:"Project End Date is required"
                }} errors={errors.projectEndDate}/> 
            {/* <div>
              <label>
                Project End Date
                </label>    
                <input type="date" id="projectEndDate" placeholder='select date' {...register("projectEndDate",{
                    valueAsDate:true,
                    validate:{
                  
                        range:(v)=>{
                            
                            if(v<startValue)
                            {
                           return "Project End Date must be greater than Project Start Date"
                        }
                        }
    
                    },
                    required:"Project End Date is required"
                })}/>
                {errors.projectEndDate && <p className="text-red-700">{errors.projectEndDate.message}</p>}
            </div>  */}
      
           

         <div>
              <label className='font-bold text-md'>Team Members</label>
            <AsyncSelect<IOption, true, GroupBase<IOption>>
                components={{ Option: CustomOption }}
                cacheOptions={true}
                onChange={onChange}
                isMulti={true}
                loadOptions={fetchOptions}
                styles={customStyles}
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