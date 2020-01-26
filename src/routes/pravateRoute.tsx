import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '~/stores'
import {
  Route,
  // Redirect,
  RouteProps,
  Redirect
} from 'react-router-dom'

const PrivateRoute: FC<RouteProps> = ({ render, ...rest }) => {
  const { logged } = useSelector((state: AppState) => state.globalReducer)

  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        logged ? (
          render!({ location, ...props })
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
