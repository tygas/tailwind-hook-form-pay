import React from 'react'

import { useLocale } from '../context/LocaleContext'
import { LocaleE } from '../interfaces/LocaleE'

export const LocaleSelector: React.FC = () => {
  const { locale, setLocale } = useLocale()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as LocaleE)
  }

  return (
    <select value={locale} onChange={handleChange}>
      <option value={LocaleE.EN}>🇬🇧 (US)</option>
      <option value={LocaleE.LT}>🇱🇹 (LT)</option>
    </select>
  )
}
