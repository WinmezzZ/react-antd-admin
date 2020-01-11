import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import LayoutPage from './pages/layout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LayoutPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
