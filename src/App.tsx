import React, {
  lazy,
  Suspense,
} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { theme } from './config/theme'
import Fallback from './components/Fallback'

const Counter = lazy(() => import('./Pages/Counter'))
const NotFoundPage = lazy(() => import('./Pages/NotFound'))

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Link to="/test">Counter</Link>
      <Link to="/">Home</Link>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path="/" exact />
          <Route path="/test" exact component={Counter} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  </ThemeProvider>
)

export default App
