import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('HomePage', () => {
  it('displays the error when api returns error data', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            error: {
              code: 401,
              message: 'test error message',
              errors: ['testError'],
            },
          },
        },
      }),
    )

    render(<App />)
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument())
  })
})
