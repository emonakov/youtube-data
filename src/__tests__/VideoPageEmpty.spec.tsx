import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'

import { video } from '../__mock__/video'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('VideoPage', () => {
  it('displays "Video not found" message', async () => {
    mockAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: video,
        }),
      )
      .mockImplementationOnce(() => Promise.resolve({}))
    render(<App />)
    await screen.findByTestId('QB7wTgcHLT4')
    userEvent.click(screen.getByTestId('QB7wTgcHLT4'))
    await screen.findByText('Video not found')
  })
})
