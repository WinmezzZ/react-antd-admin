import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { Route, useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useLocale } from '~/locales'
import { RouteProps, useLocation } from 'react-router'

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useSelector((state: AppState) => state.userReducer)
  const navigate = useNavigate()
  const { formatMessage } = useLocale()
  const location = useLocation()
  return logged ? (
    <Route {...props} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button
          type="primary"
          onClick={() => navigate('/login', { replace: true, state: { from: location.pathname } })}
        >
          {formatMessage({ id: 'gloabal.tips.goToLogin' })}
        </Button>
      }
    />
  )
}

export default PrivateRoute
