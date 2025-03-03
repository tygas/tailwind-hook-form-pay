import React from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FormWrapper } from './FormWrapper'

interface TextareaFieldProps {
  name: string
  label: string
}

export const FormTextarea: React.FC<TextareaFieldProps> = ({ name, label }) => {
  return (
    <FormWrapper
      name={name}
      label={label}
      element={(field: ControllerRenderProps<FieldValues, string>) => (
        <textarea
          {...field}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      )}
    />
  )
}
