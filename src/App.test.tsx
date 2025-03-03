import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import App from './App'

test('working with msw', async () => {
  render(<App />)

  // Showing Spinner
  await waitFor(
    () => {
      expect(screen.getByText('Amount')).toBeInTheDocument()
    },
    { timeout: 4000 },
  )
})
