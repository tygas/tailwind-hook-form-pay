import axios from 'axios'
import * as yup from 'yup'

export const paySchema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
  payeeAccount: yup
    .string()
    .required('Payee account is required')
    .test('valid-iban', 'Invalid IBAN', async (value) => {
      const response = await axios.get(
        `https://matavi.eu/validate/?iban=${value}`,
      )
      return response.data.valid
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
