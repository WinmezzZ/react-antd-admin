import React, { FC, lazy } from 'react'
import RenderRoutes, { RouteProps } from './config'

import Dashboard from '~/pages/dashboard'
import { Redirect } from 'react-router-dom'
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '~/pages/guide'))
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '~/pages/permission/route'))
const ButtonPermission = lazy(() => import(/* webpackChunkName: "button-permission"*/ '~/pages/permission/button'))
const PermissionConfig = lazy(() => import(/* webpackChunkName: "permission-config'"*/ '~/pages/permission/config'))
const AccountPage = lazy(() => import(/* webpackChunkName: "account'"*/ '~/pages/account'))

const routerTree: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    meta: {
      titleId: ''
    }
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    meta: {
      titleId: 'title.dashboard'
    }
  },
  {
    path: '/guide',
    exact: true,
    component: Guide,
    meta: {
      titleId: 'title.guide'
    }
  },
  {
    path: '/permission/route',
    exact: true,
    component: RoutePermission,
    meta: {
      titleId: 'title.permission.route',
      auth: true
    }
  },
  {
    path: '/permission/button',
    exact: true,
    component: ButtonPermission,
    meta: {
      titleId: 'title.permission.button'
    }
  },
  {
    path: '/permission/config',
    exact: true,
    component: PermissionConfig,
    meta: {
      titleId: 'title.permission.config'
    }
  },
  {
    path: '/account',
    exact: true,
    component: AccountPage,
    meta: {
      titleId: 'title.account'
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      titleId: 'title.notFount'
    }
  }
]

const MainRoutes: FC = () => <RenderRoutes routes={routerTree} />

export default MainRoutes
