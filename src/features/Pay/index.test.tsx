import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import React from 'react'
import { vi } from 'vitest'

import { LocaleE } from '../../interfaces/LocaleE'

import { payerAccounts } from './defaults/payerAccounts'

import { PaymentForm } from './index'

// Mock the useLocale hook
vi.mock('../../context/LocaleContext', () => ({
  useLocale: () => ({
    locale: LocaleE.EN,
  }),
}))

// Mock the getPayerAccOptions function
vi.mock('../../helpers/getPayerAccOptions', () => ({
  getPayerAccOptions: () =>
    payerAccounts.map(({ iban }) => ({ value: iban, label: iban })),
}))

// Mock the axios request
vi.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue({ data: { valid: true } })

test('triggers validation on amount change', async () => {
  const user = userEvent.setup()
  render(<PaymentForm />)

  // Find the amount input and enter 0.001
  const amountInput = screen.getByLabelText('Amount')
  await user.type(amountInput, '0.001')

  // Check for the error message
  await waitFor(() => {
    expect(
      screen.getByText('Amount must be greater than 0.01'),
    ).toBeInTheDocument()
  })
})

test('throws error when amount is bigger than balance', async () => {
  const user = userEvent.setup()
  render(<PaymentForm />)

  const { iban, balance } = payerAccounts[1]
  const amountInput = screen.getByLabelText('Amount')
  await user.type(amountInput, '3')

  const payeeAccountInput = screen.getByLabelText('Payer Account')
  await user.selectOptions(payeeAccountInput, iban)

  await waitFor(() => {
    expect(screen.getByText(`Exceeds balance ${balance}`)).toBeInTheDocument()
  })
})
