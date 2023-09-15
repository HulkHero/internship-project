import React from 'react'

type Props = {
    index:number,
    length:number
}

const ProgressBar = ({index,length}: Props) => {
    let width = 0
    width=(index+1)*100/length
  return (
    <div className='mb-6 h-5 w-full bg-neutral-200 '>
        <div className={`h-5 bg-textGray transition-all duration-500  `} style={{width:`${width}%`}} ></div>
    </div>
  )
}

export default ProgressBar