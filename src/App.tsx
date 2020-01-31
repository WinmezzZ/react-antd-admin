import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import LayoutPage from './pages/layout'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { AppState } from './stores'
import { lacaleConfig } from './locales'
import RenderRoutes, { RouteProps } from './routes/config'

const rootRoutes: RouteProps[] = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
    meta: {
      titleId: 'title.login'
    }
  },

  {
    path: '/',
    component: LayoutPage,
    meta: {
      titleId: ''
    }
  }
]

const App: React.FC = () => {
  const { locale } = useSelector((state: AppState) => state.globalReducer)

  return (
    <IntlProvider locale={locale.split('_')[0]} messages={lacaleConfig[locale]}>
      <BrowserRouter>
        <RenderRoutes routes={rootRoutes} />
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
