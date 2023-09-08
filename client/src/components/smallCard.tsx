import React from 'react'

type Props = {
    _id: string;
    firstName: string;
    lastName: string;
    systemRole: string;
    techRole: string;
}

const SmallCard = (props: Props) => {
  return (
    <div className='bg-white'>
        <div className='p-2 bg-blue-100 cursor-pointer hover:bg-darkRed hover:text-white rounded-lg'>
            <div className='flex'>
            <h1>{props.firstName}</h1>
            <h1>{props.lastName}</h1>
            </div>
            <div className='text-sm flex'>
               <h1> {props.techRole}</h1>
                <h1>{props.systemRole}</h1>
                </div>
         </div>       
    </div>
  )
}

export default SmallCard