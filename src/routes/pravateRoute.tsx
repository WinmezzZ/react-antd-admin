import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useLocale } from '~/locales'

const PrivateRoute: FC<RouteProps> = ({ render, ...rest }) => {
  const { logged } = useSelector((state: AppState) => state.userReducer)
  const history = useHistory()
  const { formatMessage } = useLocale()

  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        logged ? (
          render!({ location, ...props })
        ) : (
          <Result
            status="403"
            title="403"
            subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
            extra={
              <Button type="primary" onClick={() => history.replace('/login', { from: location })}>
                {formatMessage({ id: 'gloabal.tips.goToLogin' })}
              </Button>
            }
          />
        )
      }
    />
  )
}

export default PrivateRoute
