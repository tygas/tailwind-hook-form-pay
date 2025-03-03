import React from 'react'

import type { LocaleE } from '../interfaces/LocaleE'
import type { PayerAccountI } from '../interfaces/PayerAccountI'

import { FormatBalance } from './FormatBalance'

interface PayerAccOptionsProps {
  payerAccounts: PayerAccountI[]
  locale: LocaleE
}
export const getPayerAccOptions = ({
  payerAccounts,
  locale,
}: PayerAccOptionsProps) =>
  payerAccounts.map((account) => ({
    value: account.iban,
    label: (
      <>
        {account.iban} - Balance:{' '}
        <FormatBalance balance={account.balance} locale={locale} />
      </>
    ),
  }))
