import React, { FC } from 'react'
import { Route, RouteConfigObject } from 'react-router-dom'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

export interface RouteProps extends RouteConfigObject {
  meta: {
    /** document title locale id */
    titleId: string
    /** authorization？ */
    auth?: boolean
  }
  children?: RouteProps[]
}

interface Props {
  routes: RouteProps[]
}

const RenderRoutes: FC<Props> = ({ routes }) => {
  const { formatMessage } = useIntl()
  return (
    <>
      {routes.map(route => {
        const { meta } = route
        const { titleId, auth } = meta
        const WitchRoute = auth ? PrivateRoute : Route
        meta.titleId &&
          (document.title = formatMessage({
            id: titleId
          }))
        return WitchRoute
      })}
    </>
  )
}

export default RenderRoutes
