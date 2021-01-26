import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import { video, videoTitle } from '../__mock__/video'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('VideoPage', () => {
  it('Navigates the video page', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: video,
      }),
    )
    render(<App />)
    await screen.findByTestId('QB7wTgcHLT4')
    userEvent.click(screen.getByTestId('QB7wTgcHLT4'))
    await screen.findByText(videoTitle)
    expect(screen.getByTestId('video-iframe')).toBeInTheDocument()
  })

  it('displays "Video not found" message', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({}),
    )
    render(<App />)
    await screen.findByText('Video not found')
  })

  it('displays error', async () => {
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
    await screen.findByTestId('error')
  })
})
