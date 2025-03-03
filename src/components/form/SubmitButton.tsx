import React from 'react'

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = 'Submit',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      type="submit"
      {...props}
      className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${
        disabled ? 'cursor-not-allowed opacity-80' : ''
      } ${className}`}
    >
      {text}
    </button>
  )
}
