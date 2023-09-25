import React from 'react'

type Props = {
    variant:string
}

const Skeleton = ({variant}: Props) => {
   switch(variant){
         case "box":
                return (
                    <div className='animate-pulse p-4 min-w-[200px] max-w-[250px]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-36'></div>
                  </div>
                )
         case "chart":
                return (
                    <div className='animate-pulse p-4 min-w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-[40vh]'></div>
                    </div>
                )
         case "bar":
                return (
                    <div className='animate-pulse p-4 w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-10'></div>
                    </div>
                )
          case "4charts":
                return (
                    <div className='flex flex-row flex-wrap'>
                    <div className='animate-pulse p-4 min-w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-[40vh]'></div>
                    </div>
                 
                    <div className='animate-pulse p-4  min-w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-[40vh]'></div>
                    </div>

            
                    <div className='animate-pulse p-4 min-w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-[40vh]'></div>
                    </div>
                    
                    <div className='animate-pulse p-4 min-w-[50%]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-[40vh]'></div>

                    </div>
                    </div>
                ) 
                
            default:
                return (
                    <div className='animate-pulse p-4 min-w-[200px] max-w-[250px]'>
                    <div className='bg-gray-200 rounded-lg shadow-md h-36'></div>
                    </div>
                )
   }

}

export default Skeleton