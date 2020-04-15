import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { Route, RouteProps, useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useLocale } from '~/locales'

const PrivateRoute: FC<RouteProps> = ({ path, element }) => {
  const { logged } = useSelector((state: AppState) => state.userReducer)
  const navigate = useNavigate()
  const { formatMessage } = useLocale()

  return logged ? (
    <Route path={path} element={element}></Route>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button type="primary" onClick={() => navigate('/login', { replace: true, state: { from: path } })}>
          {formatMessage({ id: 'gloabal.tips.goToLogin' })}
        </Button>
      }
    />
  )
}

export default PrivateRoute
