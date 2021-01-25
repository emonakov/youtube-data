import React from 'react'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { store } from './videoStore'

const Video: React.FC = () => {
  console.log(store.getState())

  return (
    <Provider store={store}>
      <Helmet>
        <title>Some video title</title>
      </Helmet>
      <h1>VIDEO PAGE</h1>
    </Provider>
  )
}

export default Video
