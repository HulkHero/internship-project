import React from 'react'
import GridLayout from './GridLayout'
import { AiOutlineDoubleRight } from 'react-icons/ai'

const Bar = () => {
  const [showCharts, setshowCharts] = React.useState(false)
    const toggleBars=()=>{
        setshowCharts(!showCharts)
    }

  return (
    <div>
         <div className='flex flex-wrap max-[400px]:flex-col items-center justify-between max-w-full text-white  mx-4 p-2 bg-brightRed rounded-lg'>
            <div>
                Managers and Projects
            </div>
            <div>
                <button onClick={()=>toggleBars()} className=' rounded-full px-2 py-1'>
                <div  className='flex justify-between pr-1'> <AiOutlineDoubleRight className={`${showCharts===true? "transition-all rotate-90 ":"transition-all rotate-0"}  text-xl opacity-95`}/></div>
    
                </button>
            </div>
         </div>
         {
            showCharts===true && <GridLayout ></GridLayout>
         }
    </div>
  )
}

export default Bar