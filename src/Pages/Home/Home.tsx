import React from 'react'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { store } from './homeStore'
import HomePage from '../../components/HomePage'

const CounterPage: React.FC = () => (
  <Provider store={store}>
    <Helmet>
      <title>YOUTUBE DATA TEST MAIN PAGE</title>
    </Helmet>
    <HomePage />
  </Provider>
)

export default CounterPage
