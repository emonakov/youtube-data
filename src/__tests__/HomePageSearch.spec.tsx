import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import {
  popularDefault,
  testTitleDefault,
  popularNextPage,
  testTitleNextPage,
} from '../__mock__/popular'
import {
  searchResults,
  searchResultsNext,
  testSearchTitle,
  testSearchNextTitle,
} from '../__mock__/search'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('HomePage', () => {
  it('searches on the homepage and paginates the results and resets to popular', async () => {
    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: popularDefault,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: searchResults,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: searchResultsNext,
        }),
      )
    render(<App />)
    await waitFor(() =>
      expect(screen.getByText(testTitleDefault)).toBeInTheDocument(),
    )
    userEvent.type(screen.getByTestId('search'), 'test')
    userEvent.click(screen.getByText('SEARCH'))
    await waitFor(() =>
      expect(screen.getByText(testSearchTitle)).toBeInTheDocument(),
    )
    userEvent.click(screen.getByTestId('navigation-next'))
    await waitFor(() =>
      expect(screen.getByText(testSearchNextTitle)).toBeInTheDocument(),
    )
    userEvent.click(screen.getByText('RESET'))
    expect(screen.getByText('SEARCH')).toBeDisabled()
  })

  // it('displays the error when api returns error data', async () => {
  //   mockAxios.get.mockImplementation(() =>
  //     Promise.reject({
  //       response: {
  //         data: {
  //           error: {
  //             code: 401,
  //             message: 'test error message',
  //             errors: ['testError'],
  //           },
  //         },
  //       },
  //     }),
  //   )

  //   render(<App />)
  //   await screen.findByTestId('video-list-container')
  //   userEvent.clear(screen.getByTestId('search'))
  //   userEvent.type(screen.getByTestId('search'), 'test')
  //   expect(screen.getByText('SEARCH')).not.toBeDisabled()
  //   userEvent.click(screen.getByText('SEARCH'))
  //   await waitFor(() => {})
  //   expect(screen.getByTestId('error')).toBeInTheDocument()
  // })
})
