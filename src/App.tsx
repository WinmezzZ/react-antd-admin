import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import LayoutPage from './pages/layout'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { AppState } from './stores'
import { lacaleConfig } from './locales'

const App: React.FC = () => {
  const { locale } = useSelector((state: AppState) => state.globalReducer)

  return (
    <IntlProvider locale={locale.split('_')[0]} messages={lacaleConfig[locale]}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" component={LayoutPage} />
        </Switch>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
