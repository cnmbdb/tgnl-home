import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false
}) => {
  return (
    <div
      className={`
        rounded-lg p-6 relative
        ${className.includes('border-') ? '' : 'border border-gray-800'}
        ${className.includes('bg-') ? '' : 'bg-gray-900/50'}
        ${hover ? 'transition-colors hover:border-gray-700 hover:bg-gray-900' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`mb-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = ''
}) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

