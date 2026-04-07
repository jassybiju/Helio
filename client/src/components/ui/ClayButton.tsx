import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant? : 'primary' | 'secondary' | 'danger',
  size? : 'sm' | 'md' | 'lg',
  className? : string,
}

const ClayButton = ({
  variant='primary',
  size='md',
  className,
  children,
  ...props
} : ButtonProps) => {

  const baseStyles = 'rounded-full font-medium text-nowrap transition-all duration-300 active:scale-95'

  const variantStyles = {
    primary: 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_18px_40px_rgba(37,99,235,0.35),0_8px_20px_rgba(37,99,235,0.25),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_52px_rgba(37,99,235,0.4),0_12px_28px_rgba(37,99,235,0.3),inset_0_1px_0px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1)] hover:scale-105 active:shadow-[0_10px_20px_rgba(37,99,235,0.3),inset_0_1px_0px_rgba(255,255,255,0.3),inset_0_2px_6px_rgba(0,0,0,0.2)]',
    secondary: 'bg-gradient-to-b from-slate-50 to-white text-slate-900 shadow-[0_15px_35px_rgba(0,0,0,0.12),0_5px_15px_rgba(0,0,0,0.08),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:scale-105 active:shadow-[0_8px_15px_rgba(0,0,0,0.1) inset_0_1px_0px_rgba(255,255,255,1),inset_0_1px_3px_rgba(0,0,0,0.1)]',
    danger: 'bg-gradient-to-b from-red-500 to-red-700 text-white shadow-[0_15px_35px_rgba(0,0,0,0.12),0_5px_15px_rgba(0,0,0,0.08),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.1),inset_0_1px_0px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:scale-105 active:shadow-[0_8px_15px_rgba(0,0,0,0.1) inset_0_1px_0px_rgba(255,255,255,1),inset_0_1px_3px_rgba(0,0,0,0.1)]'
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}` }
      {...props}
    >
      {children}
    </button>
  );
};

export default ClayButton;
