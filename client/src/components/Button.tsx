import React from 'react'

type Props = {
    text: string,
    onClick?: () => void,
    disabled?: boolean,
    type:"button" | "submit" | "reset",  
    icon?: React.ReactNode
}

const Button = (props: Props) => {
  return (
    <div>
    <button type={props.type} disabled={props.disabled} className="flex items-center gap-2 bg-blue-500 disabled:bg-blue-300 text-white py-2 px-4 rounded-md disabled:hover:bg-blue-300 hover:bg-blue-600">
        {props.text}
        {props.icon && props.icon}
    </button>
    </div>

  )
}

export default Button