import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

import MenuBar from './components/MenuBar'
import Link from './components/shared/Link'
import Fallback from './components/Fallback'
import { theme } from './config/theme'

const Home = lazy(() => import('./Pages/Home'))
const Video = lazy(() => import('./Pages/Video'))
const NotFoundPage = lazy(() => import('./Pages/NotFound'))

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <HelmetProvider>
      <Router>
        <MenuBar>
          <Link to="/">
            Home
          </Link>
        </MenuBar>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/video/:id" component={Video} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </HelmetProvider>
  </ThemeProvider>
)

export default App
