import React, { FC, LazyExoticComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

export type RouteConfig = {
  /**
   * Route path
   */
  path: string
  /**
   * Required React.FunctionalComponent and React.Lazy component, see the detail in src/App.vue.
   */
  component: LazyExoticComponent<FC<{}>>

  exact?: boolean

  strict?: boolean

  /**
   * If it has child routes
   */
  routes?: {
    path: RouteConfig['path']
    component: RouteConfig['component']
    exact: RouteConfig['exact']
    strict: RouteConfig['strict']
  }[]
}

export default function renderRoutes(routeTree: RouteConfig[]) {
  return (
    <Switch>
      {routeTree.map((route, i) => {
        const { path, component: Component, routes, exact } = route
        return (
          <Route
            path={path}
            exact={exact}
            render={props => {
              return <Component {...props} routes={routes} key={i} {...route} />
            }}
          />
        )
      })}
    </Switch>
  )
}
