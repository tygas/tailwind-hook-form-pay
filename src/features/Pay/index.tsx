import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormattedInput } from '@c/form/FormattedInput'
import { FormInput } from '@c/form/FormInput'
import { FormSelect } from '@c/form/FormSelect'
import { FormTextarea } from '@c/form/FormTextarea'
import { SubmitButton } from '@c/form/SubmitButton'

import { useLocale } from '../../context/LocaleContext'
import { getPayerAccOptions } from '../../helpers/getPayerAccOptions'

import { payerAccounts } from './default/payerAccounts'
import type { PayFormT } from './pay.schema'
import { paySchema } from './pay.schema'

const MINIMUM_AMOUNT = 0.01
interface PayerAccount {
  iban: string
  balance: number
}

export const findAccountByIban = (
  accounts: PayerAccount[],
  iban: string,
): PayerAccount | undefined => accounts.find((acc) => acc.iban === iban)

export const PaymentForm: React.FC = () => {
  const { locale } = useLocale()
  const [amount, setAmount] = useState(0)
  const payerAccOptions = useMemo(
    () => getPayerAccOptions({ payerAccounts, locale }),
    [locale],
  )

  const methods = useForm<PayFormT>({
    defaultValues: {
      payerAccount: payerAccounts.length > 0 ? payerAccounts[0].iban : '',
      payeeAccount: '',
      purpose: '',
      payee: '',
    },
    resolver: yupResolver(paySchema),
  })

  const { handleSubmit, setError, clearErrors, watch } = methods
  const { payerAccount } = watch()
  const validateAmountAndAccount = (amount = 0, iban = '') => {
    if (amount < MINIMUM_AMOUNT) {
      return setError('amount', {
        type: 'min',
        message: `Amount must be greater than 0.01`,
      })
    }

    const selectedAccount = findAccountByIban(payerAccounts, iban)
    const newMaxAmount = selectedAccount?.balance ?? 0

    if (amount > newMaxAmount) {
      return setError('amount', {
        type: 'max',
        message: `Amount exceeds balance of ${newMaxAmount} EUR`,
      })
    }
    clearErrors('amount')
  }

  const onSubmit = (data: PayFormT) => {
    console.log('Form submitted with:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-2">
          <FormattedInput
            name="amount"
            label="Amount"
            maxLength={10}
            className="flex-grow"
            locale={locale}
            onValueChange={(floatValue) => {
              setAmount(floatValue)
              validateAmountAndAccount(floatValue, payerAccount)
            }}
          />
          <div className="flex flex-col items-start">
            <span className="text-gray-500"> EUR</span>
          </div>
        </div>

        <FormSelect
          name="payerAccount"
          label="Payer Account"
          options={payerAccOptions}
          onChange={(payerAccount) => {
            validateAmountAndAccount(amount, payerAccount)
          }}
        />

        <FormInput name="payeeAccount" label="Payee Account" />
        <FormInput name="payee" label="Payee" />
        <FormTextarea name="purpose" label="Purpose" />

        <div>
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  )
}

export default PaymentForm
