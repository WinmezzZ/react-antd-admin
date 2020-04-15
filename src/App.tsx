import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { AppState } from './stores'
import { lacaleConfig } from './locales'
import { ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { RenderRoutes } from './routes'

const App: React.FC = () => {
  const { locale } = useSelector((state: AppState) => state.globalReducer)

  useEffect(() => {
    if (locale === 'en_US') {
      moment.locale('en')
    } else if (locale === 'zh_CN') {
      moment.locale('zh-cn')
    }
  }, [locale])

  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS
    } else if (locale === 'zh_CN') {
      return zhCN
    }
  }

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split('_')[0]} messages={lacaleConfig[locale]}>
        <BrowserRouter>
          <RenderRoutes />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
