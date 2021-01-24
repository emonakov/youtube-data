import React from 'react'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

import { store } from './counterStore'
import Counter from '../../features/counter/Counter'

const CounterPage: React.FC = () => (
  <Provider store={store}>
    <Helmet>
      <title>RTK Reference Page</title>
    </Helmet>
    <Counter />
  </Provider>
)

export default CounterPage
