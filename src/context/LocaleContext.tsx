import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

import { LocaleE } from '../interfaces/LocaleE'

interface LocaleContextProps {
  locale: LocaleE
  setLocale: (locale: LocaleE) => void
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<LocaleE>(LocaleE.EN)

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
