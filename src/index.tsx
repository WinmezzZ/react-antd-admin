import React, { ReactElement, FC } from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from './serviceWorker'
import App from './App'

const render = (component: ReactElement) => {
  ReactDOM.render(component, document.getElementById('root'))
}

render(<App />)

// hmr enable
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    const Router: FC = require('./App').default
    render(<Router />)
  })
}

serviceWorker.unregister()
