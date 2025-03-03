import type { ReactElement, JSXElementConstructor } from 'react'
import React from 'react'
import type {
  ControllerRenderProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

import { ErrorMessage } from './ErrorMessage'

interface FormWrapperProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>
  label: string
  element: (
    field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>,
  ) => ReactElement<any, string | JSXElementConstructor<any>>
}

export const FormWrapper = <TFieldValues extends FieldValues>({
  name,
  label,
  element,
}: FormWrapperProps<TFieldValues>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>()

  const hasError = !!errors[name]

  if (name === 'amount') {
    console.log(errors[name])
  }
  return (
    <div className={hasError ? '' : 'pb-[28px]'}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => element(field)}
      />
      {hasError && typeof errors[name]?.message === 'string' && (
        <ErrorMessage message={errors[name].message} />
      )}
    </div>
  )
}
