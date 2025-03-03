import React from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FormWrapper } from './FormWrapper'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  type?: string
}

export const FormInput: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  ...props
}) => {
  return (
    <FormWrapper
      name={name}
      label={label}
      element={(field: ControllerRenderProps<FieldValues, string>) => (
        <input
          type={type}
          {...field}
          {...props}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      )}
    />
  )
}
