import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.less'
import configureStore from './stores'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './mock'
const store = configureStore()

const render = (Router: React.FC) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

// hmr enable
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    const Router = require('./App').default
    render(Router)
  })
}

serviceWorker.unregister()
