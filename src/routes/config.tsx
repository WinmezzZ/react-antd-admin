import React, { FC, LazyExoticComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

export type RouteConfig = {
  /**
   * Route path
   */
  path: string | string[]
  /**
   * Required React.FunctionalComponent and React.Lazy component, see the detail in src/App.vue.
   */
  component: LazyExoticComponent<FC<{ [x: string]: any; meta: any }>>

  exact?: boolean

  strict?: boolean

  meta?: any

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
        const { path, component: Component, exact, meta } = route
        return (
          <Route
            path={path}
            exact={exact}
            key={i}
            render={props => {
              meta.title && (document.title = meta.title)
              return <Component {...props} meta={meta} key={i} />
            }}
          />
        )
      })}
    </Switch>
  )
}
