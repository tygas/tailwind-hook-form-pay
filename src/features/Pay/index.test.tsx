import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import React from 'react'
import { vi } from 'vitest'

import { LocaleE } from '../../interfaces/LocaleE'

import { PaymentForm } from './index'

// Mock the useLocale hook
vi.mock('../../context/LocaleContext', () => ({
  useLocale: () => ({
    locale: LocaleE.EN,
  }),
}))

// Mock the getPayerAccOptions function
vi.mock('../../helpers/getPayerAccOptions', () => ({
  getPayerAccOptions: () => [
    { value: 'account1', label: 'Account 1' },
    { value: 'account2', label: 'Account 2' },
  ],
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
