import '@/polyfills'
import 'normalize.css'
import 'reset-css'
import '@/styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ThemeProvider } from 'styled-components'
import promiseMiddleware from 'redux-promise-middleware'
import theme from '@/theme'
import reducers from '@/reducers'
import App from '@/app'

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
