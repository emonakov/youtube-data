import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import { searchResults, testSearchTitle } from '../__mock__/search'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('HomePage', () => {
  it('displays "Nothing found" message and resets back to popular if nothing found by clearing search field', async () => {
    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: searchResults,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            ...searchResults,
            items: [],
          },
        }),
      )

    render(<App />)
    await waitFor(() =>
      expect(screen.getByText(testSearchTitle)).toBeInTheDocument(),
    )
    userEvent.type(screen.getByTestId('search'), 'test')
    userEvent.click(screen.getByText('SEARCH'))
    await waitFor(() => expect(screen.getByText('Nothing found')))
    userEvent.clear(screen.getByTestId('search'))
    await screen.findByTestId('navigation-next')
    expect(screen.getByText('SEARCH')).toBeDisabled()
  })
})
