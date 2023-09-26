import React from 'react'
import { useChangeRole } from '../../../ReactKueries/PaginatedUsers'
import { useAppSelector } from '../../../redux/hooks'
import { authSelector } from '../../../redux/slices/authSlice'

type Props = {
    systemRole:string
    cellId:string,
    _id:string,
    page:number
}

const RadioInputs = ({systemRole,cellId,_id,page}: Props) => {

    const userSystemRole=useAppSelector(authSelector).systemRole

    const [selectedOption, setSelectedOption] = React.useState<string>(systemRole);

    const {mutate}=useChangeRole()


    const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue=e.target.value

        setSelectedOption(e.target.value);
        
         mutate({setSelectedOption,page,systemRole:newValue,_id})
      }


  return (
    <div className="flex flex-row justify-around" >
    
    <div className="flex ">
      <label className="label flex-col cursor-pointer">
        <input type="radio" name={cellId} value={"admin"} disabled={true} onChange={handleChange} className="radio radio-sm checked:bg-darkRed no-animation disabled:opacity-50" checked={selectedOption==="admin"} />
        <span className="label-text lab">Admin</span> 
      </label>
    </div>
    <div className="">
      <label className="label flex-col cursor-pointer">
        <input type="radio" name={cellId} value={"manager"} disabled={userSystemRole!=="admin"||systemRole==="admin"} onChange={handleChange} className="radio no-animation radio-sm checked:bg-blue-500 disabled:opacity-50" checked={selectedOption==="manager"} />
        <span className="label-text">Manager</span> 
      </label>
    </div>
    <div className="">
      <label className="label flex-col cursor-pointer">
        <input type="radio" name={cellId} value={"employee"} disabled={userSystemRole!=="admin"||systemRole==="admin"} onChange={handleChange} className="radio radio-sm no-animation checked:bg-green-500 disabled:opacity-50" checked={selectedOption==="employee"} />
        <span className="label-text">Employee</span> 
      </label>
    </div>
  </div>
  )
}

export default RadioInputs