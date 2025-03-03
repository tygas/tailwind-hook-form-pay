import React, { useState } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { FormWrapper } from './FormWrapper'

export type FormSelectT = { value: string; label: React.ReactNode | string }
interface SelectFieldProps {
  name: string
  label: string
  options: FormSelectT[]
  onChange?: (value: string) => void
}

export const FormSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (
    value: string,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    field.onChange(value)
    setIsOpen(false)
    if (onChange) {
      onChange(value)
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    value: string,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelect(value, field)
    }
  }

  return (
    <FormWrapper
      name={name}
      label={label}
      element={(field: ControllerRenderProps<FieldValues, string>) => (
        <div className="relative">
          <select
            {...field}
            id={name}
            className="hidden"
            onChange={(e) => handleSelect(e.target.value, field)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            role="button"
            tabIndex={0}
            className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 px-2 py-2 text-sm shadow focus:border-indigo-500 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => handleKeyDown(e, field.value, field)}
          >
            {options.find((option) => option.value === field.value)?.label}
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={option.value === field.value}
                  tabIndex={0}
                  className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                  onClick={() => handleSelect(option.value, field)}
                  onKeyDown={(e) => handleKeyDown(e, option.value, field)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  )
}
