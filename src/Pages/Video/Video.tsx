import React from 'react'
import { Provider } from 'react-redux'

import VideoPage from '../../components/VideoPage'
import { store } from './videoStore'

const Video: React.FC = () => (
  <Provider store={store}>
    <VideoPage />
  </Provider>
)

export default Video
