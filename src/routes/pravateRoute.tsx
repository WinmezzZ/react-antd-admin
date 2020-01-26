import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import { Route, RouteProps, useHistory } from 'react-router-dom'
import { Result, Button } from 'antd'

const PrivateRoute: FC<RouteProps> = ({ render, ...rest }) => {
  const { logged } = useSelector((state: AppState) => state.userReducer)
  const history = useHistory()

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
            subTitle="对不起，游客无法查看此页面"
            extra={
              <Button type="primary" onClick={() => history.replace('/login', { from: location })}>
                去登录
              </Button>
            }
          />
        )
      }
    />
  )
}

export default PrivateRoute
