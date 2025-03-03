import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormattedInput } from '@c/form/FormattedInput'
import { FormInput } from '@c/form/FormInput'
import { FormSelect } from '@c/form/FormSelect'
import { FormTextarea } from '@c/form/FormTextarea'
import { SubmitButton } from '@c/form/SubmitButton'

import { useLocale } from '../../context/LocaleContext'
import { getPayerAccOptions } from '../../helpers/getPayerAccOptions'

import { payerAccounts } from './defaults/payerAccounts'
import type { PayFormT } from './pay.schema'
import { paySchema } from './pay.schema'

export const PaymentForm: React.FC = () => {
  const { locale } = useLocale()
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
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isValid, isSubmitting },
  } = methods

  const onSubmit = async (data: PayFormT) => {
    const result = await paySchema
      .validate(data, {
        abortEarly: false,
        context: { isSubmitting: methods.formState.isSubmitting },
      })
      .catch((err) => {
        if (err.inner) {
          err.inner.forEach((error: any) => {
            setError(error.path, {
              type: 'manual',
              message: error.message,
            })
          })
        }
        return null
      })

    if (result) {
      alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`)
      reset()
    }
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
          />
          <div className="flex flex-col items-start">
            <span className="text-gray-500"> EUR</span>
          </div>
        </div>
        <FormSelect
          name="payerAccount"
          label="Payer Account"
          options={payerAccOptions}
          onChange={async () => methods.trigger('amount')}
        />
        <FormInput name="payeeAccount" label="Payee Account" maxLength={34} />
        <FormInput name="payee" label="Payee" />
        <FormTextarea name="purpose" label="Purpose" />
        <div>
          <SubmitButton
            disabled={!isValid || isSubmitting}
            text={isSubmitting ? 'Submitting..' : 'Send payment'}
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default PaymentForm
