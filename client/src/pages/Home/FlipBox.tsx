import React from 'react';

interface Props {
    text: string
    image: string
    caption:String
}
function FlipBox({image,text,caption}:Props) {
  return (
    <div className='w-[250px] shadow-lg h-[300px] rounded-lg bg-white' >
      <div>
        <img src={image} alt="" className='w-[250px] h-[150px]' />
      </div>
      <div className='p-3 pt-1 flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-center font-bold'>{caption}</h1>
        <p className='text-sm text-center'>{text}</p>
      </div>


    </div>
  
  );
}

export default FlipBox;
