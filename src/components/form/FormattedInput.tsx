import React from 'react'
import { NumericFormat } from 'react-number-format'

import { currencyProps } from '../../configs/currenyFormat'
import type { LocaleE } from '../../interfaces/LocaleE'

import { FormWrapper } from './FormWrapper'

interface FormattedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  type?: string
  locale: LocaleE
  onValueChange?: (value: number) => void
}

export const FormattedInput: React.FC<FormattedInputProps> = ({
  name,
  label,
  locale,
  onValueChange,
}) => {
  return (
    <FormWrapper
      name={name}
      label={label}
      element={({ ref, onChange, ...rest }) => (
        <NumericFormat
          id={name}
          thousandSeparator={currencyProps[locale].thousandSeparator}
          decimalSeparator={currencyProps[locale].decimalSeparator}
          getInputRef={ref}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...rest}
          onValueChange={({ floatValue }) => {
            onValueChange?.(floatValue || 0)
            onChange(floatValue)
          }}
        />
      )}
    />
  )
}
