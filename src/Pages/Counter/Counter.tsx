import React from 'react'
import { Provider } from 'react-redux'

import { store } from './counterStore'
import Counter from '../../features/counter/Counter'

const CounterPage: React.FC = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
)

export default CounterPage
