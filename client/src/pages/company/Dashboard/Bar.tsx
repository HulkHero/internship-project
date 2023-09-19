import React from 'react'

type Props = {}

const Bar = (props: Props) => {
  return (
    <div className='flex justify-between max-w-full mx-4 p-2 bg-brightRed rounded-lg'>
        <div>
            Search
        </div>
        <div>
            Filter
        </div>
        <div>
            Select
        </div>
    </div>
  )
}

export default Bar