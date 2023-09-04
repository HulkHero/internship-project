import React,{memo} from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { textValidation,emailValidation,numberValidation } from '../../utils/InputValidations';
import TextInput from '../../components/InputFields/TextInput';
import Input2 from '../../components/Input2';
import NumberInput from '../../components/InputFields/NumberInput';
import CustomInput from '../../components/InputFields/CustomInput';

interface Ikpi {
    kpiName: string;
    kpiWeight: number;
    kpiThreshold: number;
}

interface IForm {
    techRole: string;
    kpis: Ikpi[];
}

type Props = {
    register: UseFormRegister<IForm>;
    remove: (index: number) => void;
    errors: FieldErrors<IForm>;
    index: number;
    getValues: UseFormGetValues<IForm>;
    toggle: string;
    id: string;
};

const Inputs = (props: Props) => {
    const { register:register1, remove, index, errors, id, toggle } = props;
    const register=React.useCallback(
       register1,
      [])
    
    return (
        <div className={`${id === toggle ? '' : 'hidden'} m-5 p-5 border rounded-lg bg-gray-100`}>
         <CustomInput<IForm> title={"Kpi Name"} type={"text"} rules={textValidation("Kpi Name")} name={`kpis.${index}.kpiName`} placeholder={"Enter Kpi Name"} errors={errors?.kpis?.[index]?.kpiName} register={register}/>
            <CustomInput<IForm> rules={numberValidation(0,100)} title={"Kpi Weight"} placeholder={"Enter Weight"} type={"number"} name={`kpis.${index}.kpiWeight`}  errors={errors?.kpis?.[index]?.kpiWeight}  register={register} />
            <CustomInput<IForm> rules={numberValidation(0,10)} title={"Kpi Threshold"} placeholder={"Enter Threshold"} type={"number"} name={`kpis.${index}.kpiThreshold`}  errors={errors?.kpis?.[index]?.kpiThreshold}  register={register} />
            <div>
                {index === 0 ? '' : <button type="button" onClick={() => {remove(index)}} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>}
            </div>
        </div>
    );
};

export default Inputs;
