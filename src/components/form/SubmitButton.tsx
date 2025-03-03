import React from 'react'

interface SubmitButtonProps {
  text?: string
  className?: string
  onClick?: () => void
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = 'Submit',
  className = '',
  onClick,
}) => {
  return (
    <button
      type="submit"
      className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
