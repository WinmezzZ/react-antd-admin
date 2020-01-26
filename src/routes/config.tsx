import React, { FC, LazyExoticComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './pravateRoute'

export type RouteConfig = {
  /**
   * Route path
   */
  path: string | string[]
  /**
   * Required React.FunctionalComponent and React.Lazy component, see the detail in src/App.vue.
   */
  component: LazyExoticComponent<FC> | React.FC

  exact?: boolean

  strict?: boolean

  meta: {
    /** document title */
    title: string
    /** authorization？ */
    auth?: boolean
  }
}

export default function renderRoutes(routeTree: RouteConfig[]) {
  return (
    <Switch>
      {routeTree.map((route, i) => {
        const { path, component: Component, exact, meta } = route
        const WitchRoute = meta.auth ? PrivateRoute : Route
        return (
          <WitchRoute
            path={path}
            exact={exact}
            key={i}
            render={props => {
              meta.title && (document.title = meta.title)
              return <Component {...props} key={i} />
            }}
          />
        )
      })}
    </Switch>
  )
}
