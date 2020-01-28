import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import LayoutPage from './pages/layout'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { AppState } from './stores'
import zh_CN from './locales/zh-CN'
import en_US from './locales/en-US'

const App: React.FC = () => {
  const { locale } = useSelector((state: AppState) => state.globalReducer)

  const getMessage = (message: string) => {
    let returnMsg
    switch (message) {
      case 'zh_CN':
        returnMsg = zh_CN
        break
      case 'en_US':
        returnMsg = en_US
        break
    }
    return returnMsg
  }
  return (
    <IntlProvider locale={locale.split('-')[0]} messages={getMessage(locale.replace('-', '_'))}>
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
