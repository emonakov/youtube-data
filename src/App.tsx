import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

import MenuBar from './components/MenuBar'
import Link from './components/shared/Link'
import Fallback from './components/Fallback'
import { theme } from './config/theme'

const Counter = lazy(() => import('./Pages/Counter'))
const Home = lazy(() => import('./Pages/Home'))
const NotFoundPage = lazy(() => import('./Pages/NotFound'))

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <HelmetProvider>
      <Router>
        <MenuBar>
          <Link to="/" exact>
            Home
          </Link>
          <Link to="/test">Counter</Link>
        </MenuBar>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/test" exact component={Counter} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </HelmetProvider>
  </ThemeProvider>
)

export default App
