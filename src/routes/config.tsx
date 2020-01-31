import React, { FC, LazyExoticComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

export type RouteProps = {
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
    /** document title locale id */
    titleId: string
    /** authorization？ */
    auth?: boolean
  }
}

interface Props {
  routes: RouteProps[]
}

const RenderRoutes: FC<Props> = ({ routes }) => {
  const { formatMessage } = useIntl()
  return (
    <Switch>
      {routes.map((route, i) => {
        const { path, component: Component, exact, meta } = route
        const { titleId, auth } = meta
        const WitchRoute = auth ? PrivateRoute : Route
        return (
          <WitchRoute
            path={path}
            exact={exact}
            key={i}
            render={props => {
              meta.titleId &&
                (document.title = formatMessage({
                  id: titleId
                }))
              return <Component {...props} key={i} />
            }}
          />
        )
      })}
    </Switch>
  )
}

export default RenderRoutes
