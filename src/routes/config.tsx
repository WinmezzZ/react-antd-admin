import React, { FC, LazyExoticComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

export interface RouteProps {
  /**
   * Route path
   */
  path: string
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
  root?: boolean
  routes: RouteProps[]
}

const RenderRoutes: FC<Props> = ({ root, routes }) => {
  const { formatMessage } = useIntl()
  return (
    <Switch>
      {!root && <Redirect from="/" to="/dashboard" />}
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

RenderRoutes.defaultProps = {
  root: false
}

export default RenderRoutes
