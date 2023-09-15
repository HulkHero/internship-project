// import React from 'react'

// interface Click{
//     onClick: () => void
//     text:string
//     disabled: boolean
//     type:"button"
//     icon?: React.ReactNode
//     className?:string
//     isLoading:boolean

// }

// type FormButton = {
//     text: string,
//     disabled: boolean,
//     type:"submit" | "reset",  
//     icon?: React.ReactNode
//     className?:string
//     isLoading:boolean
// }
// type Props = Click | FormButton;
// const Button = (props: Props) => {
//   return (
//     <div>
//     <button type={props.type} disabled={props.disabled} className="flex items-center gap-2 bg-blue-500 disabled:bg-blue-300 text-white py-2 px-4 rounded-md disabled:hover:bg-blue-300 hover:bg-blue-600">
//         {props.isLoading===true?<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>:
//            <div>
//            {props.text}
//            {props.icon&& props.icon}
//            </div>
//         }
//     </button>
//     </div>

//   )
// }

// export default Button

import React from 'react';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  disabled = false,
  onClick,
  icon,
  className = '',
  isLoading = false,
}: ButtonProps) => {
  const buttonClasses = `btn ${className} ${
    isLoading ? 'btn-loading' : ''
  }  `.trim();

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClasses}
    >
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {isLoading ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
