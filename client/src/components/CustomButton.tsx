
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

const CustomButton: React.FC<ButtonProps> = ({
  text,
  type = 'button',
  disabled = false,
  onClick,
  icon,
  className = '',
  isLoading = false,
}: ButtonProps) => {
  const buttonClasses = `btn ${className} ${
    isLoading ? 'btn-loading ' : ''
  }  `.trim();

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClasses}
    >
      {icon && !isLoading && <span className="mr-2">{icon}</span>}

      {isLoading && <span className="loading mr-2 loading-dots loading-sm"></span>}
      <span>{text}</span>

    </button>
  );
};

export default CustomButton;
