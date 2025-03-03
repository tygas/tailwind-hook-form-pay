import React from 'react'

import { LocaleE } from '../interfaces/LocaleE'

interface FormatBalanceProps {
  balance: number
  locale: LocaleE
}

export const FormatBalance: React.FC<FormatBalanceProps> = ({
  balance,
  locale = LocaleE.EN,
}) => {
  const formattedBalance = balance.toLocaleString(locale, {
    style: 'currency',
    currency: 'EUR',
  })

  return (
    <span className={balance < 0 ? 'text-red-500' : ''}>
      {formattedBalance}
    </span>
  )
}
