import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import {
  popularDefault,
  popularNextPage,
  testTitleDefault,
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
  it('loads the homepage and navigates to the second page and back', async () => {
    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: popularDefault,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: popularNextPage,
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: popularDefault,
        }),
      )
    render(<App />)
    await screen.findByTestId('navigation-next')
    expect(screen.getByText(testTitleDefault)).toBeInTheDocument()
    userEvent.click(screen.getByTestId('navigation-next'))
    await screen.findByTestId('navigation-prev')
    expect(screen.getByText(testTitleNextPage)).toBeInTheDocument()
    userEvent.click(screen.getByTestId('navigation-prev'))
    await screen.findByTestId('navigation-next')
    expect(screen.getByText(testTitleDefault)).toBeInTheDocument()
  })

  it('searches on the homepage and paginates the results and resets to popular', async () => {
    mockAxios.get
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
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: popularDefault,
        }),
      )
    render(<App />)
    await screen.findByTestId('video-list-container')
    userEvent.type(screen.getByTestId('search'), 'test')
    userEvent.click(screen.getByText('SEARCH'))

    await screen.findByTestId('navigation-next')
    expect(screen.getByText(testSearchTitle)).toBeInTheDocument()
    userEvent.click(screen.getByTestId('navigation-next'))
    await screen.findByTestId('navigation-prev')
    expect(screen.getByText(testSearchNextTitle)).toBeInTheDocument()
    userEvent.click(screen.getByText('RESET'))
    await screen.findByTestId('navigation-next')
    expect(screen.getByText('SEARCH')).toBeDisabled()
    expect(screen.getByText(testTitleDefault)).toBeInTheDocument()
  })

  it('displays "Nothing found" message and resets back to popular if nothing found by clearing search field', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          ...searchResults,
          items: [],
        },
      }),
    )

    await waitFor(() => render(<App />))
    userEvent.type(screen.getByTestId('search'), 'test')
    userEvent.click(screen.getByText('SEARCH'))
    await waitFor(() => {})
    expect(screen.getByText('Nothing found'))
    userEvent.clear(screen.getByTestId('search'))
    await screen.findByTestId('navigation-next')
    expect(screen.getByText('SEARCH')).toBeDisabled()
  })

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
    await screen.findByTestId('video-list-container')
    userEvent.clear(screen.getByTestId('search'))
    userEvent.type(screen.getByTestId('search'), 'test')
    expect(screen.getByText('SEARCH')).not.toBeDisabled()
    userEvent.click(screen.getByText('SEARCH'))
    await waitFor(() => {})
    expect(screen.getByTestId('error')).toBeInTheDocument()
  })
})
