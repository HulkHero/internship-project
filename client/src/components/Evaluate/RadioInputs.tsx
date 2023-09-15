import React, { useMemo, useState } from 'react';

interface RadioProps {
    // options:string[],
    
    onChange?: (selectedValue: string) => void;
    index:number
}
const options=[
    {
        label:"Outstanding",
        value:"10"
    },
    {
        label:"Excellent",
        value:"8"
    },

    {
        label:"Good",
        value:"6"
    },
    {
        label:"Average",
        value:"4"
    },
    {
        label:"Poor",
        value:"2"
    },
    {
        label:"Very Poor",
        value:"0"
    },
]
const RadioInputs = ({onChange ,index}:RadioProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const hi=useMemo(()=>{setSelectedOption("-1")},[index])
  const handleOptionChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    
      <div>
        {options.map((option,index) => (

            <div className="form-control">
            <label className="label justify-start cursor-pointer py-3 border-b-2">
            <input type="radio" value={option.value} onChange={handleOptionChange} name="radio-10" className="radio  checked:bg-red-500" checked={selectedOption===option.value} />
            <span className='ml-2'>{option.label}</span>
            </label>
            </div>

        //   <label key={index} className="flex  items-center space-x-2 py-3 mx-3 border-b-2">
        //     <input
        //       type="radio"
        //       value={option.value}
        //       checked={selectedOption === option.value}
        //       onChange={handleOptionChange}
        //       className="form-radio cursor-pointer w-5 h-5 checked:accent-green-700 "
        //     />
        //     <span>{option.label}</span>
        //   </label>
        ))}
      </div>
    
  );
};

export default RadioInputs;
