import React from 'react'

type Props = {
    text: string,
    onClick?: () => void,
    type:"button" | "submit" | "reset",  
    icon?: React.ReactNode
}

const Button = (props: Props) => {
  return (
    <div>
    <button type={props.type} className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        {props.text}
        {props.icon && props.icon}
    </button>
    </div>

  )
}

export default Button