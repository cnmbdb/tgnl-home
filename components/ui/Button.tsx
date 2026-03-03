import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black'
  
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-100 focus:ring-gray-500',
    secondary: 'bg-white text-black hover:bg-gray-100 focus:ring-gray-500',
    outline: 'bg-white text-black border border-gray-300 hover:bg-gray-100 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-2 sm:py-1.5 text-sm min-h-[44px] sm:min-h-0',
    md: 'px-4 py-3 sm:py-2 text-base sm:text-base min-h-[44px] sm:min-h-0',
    lg: 'px-6 py-4 sm:py-3 text-lg min-h-[48px] sm:min-h-0'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} active:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
