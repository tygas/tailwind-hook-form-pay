import axios from 'axios'
import * as yup from 'yup'

import { payerAccounts } from './defaults/payerAccounts'

const MINIMUM_AMOUNT = 0.01
const MIN_IBAN_LENGTH = 15
const MAX_IBAN_LENGTH = 34

export const paySchema = yup.object().shape({
  amount: yup
    .number()
    .required('Amount is required')
    .min(MINIMUM_AMOUNT, `Amount must be greater than ${MINIMUM_AMOUNT}`)
    .test('max-balance', function (value) {
      const { payerAccount } = this.parent

      const selectedAccount = findAccountByIban(payerAccounts, payerAccount)
      const maxAmount = selectedAccount?.balance ?? 0
      return (
        value <= maxAmount ||
        this.createError({
          message: `Exceeds balance ${maxAmount}`,
        })
      )
    }),

  payeeAccount: yup
    .string()
    .required('Payee account is required')
    .min(MIN_IBAN_LENGTH, `Minimum ${MIN_IBAN_LENGTH} characters`)
    .max(MAX_IBAN_LENGTH, `Maximum ${MAX_IBAN_LENGTH} characters`)
    .test('valid-iban', 'Invalid IBAN', async function (value) {
      const isSubmitting = this.options.context?.isSubmitting
      if (!isSubmitting || !value) {
        return true
      }

      try {
        const response = await axios.get(
          `https://matavi.eu/validate/?iban=${value}`,
        )
        return response.data.valid
      } catch (error) {
        console.error('IBAN validation error:', error)
        return this.createError({
          message: 'IBAN validation failed',
        })
      }
    }),
  purpose: yup
    .string()
    .required('Purpose is required')
    .min(3, 'Minimum 3 characters')
    .max(135, 'Maximum 135 characters'),
  payerAccount: yup.string().required('Payer account is required'),
  payee: yup
    .string()
    .required('Payee is required')
    .max(70, 'Maximum 70 characters'),
})

export type PayFormT = yup.InferType<typeof paySchema>

const findAccountByIban = (
  accounts: { iban: string; balance: number }[],
  iban: string,
) => accounts.find((acc) => acc.iban === iban)
