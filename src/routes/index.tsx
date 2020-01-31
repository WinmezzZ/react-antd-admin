import React, { FC, lazy } from 'react'
import RenderRoutes, { RouteProps } from './config'

import Dashboard from '~/pages/dashboard'
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))
// const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard'"*/ '~/pages/dashboard'))
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '~/pages/guide'))
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '~/pages/permission/route'))
const ButtonPermission = lazy(() => import(/* webpackChunkName: "button-permission"*/ '~/pages/permission/button'))
const PermissionConfig = lazy(() => import(/* webpackChunkName: "permission-config'"*/ '~/pages/permission/config'))
const FormPage = lazy(() => import(/* webpackChunkName: "application-form'"*/ '~/pages/application/form'))
const TablePage = lazy(() => import(/* webpackChunkName: "application-table'"*/ '~/pages/application/table'))
const DialogPage = lazy(() => import(/* webpackChunkName: "application-dialog''"*/ '~/pages/application/dialog'))
const ComplexPage = lazy(() => import(/* webpackChunkName: "application-complex'"*/ '~/pages/application/complex'))
const AccountPage = lazy(() => import(/* webpackChunkName: "application-account'"*/ '~/pages/account'))

const routerTree: RouteProps[] = [
  {
    path: ['/', '/dashboard'],
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
    path: '/application/form',
    exact: true,
    component: FormPage,
    meta: {
      titleId: 'title.application.form'
    }
  },
  {
    path: '/application/table',
    exact: true,
    component: TablePage,
    meta: {
      titleId: 'title.application.table'
    }
  },
  {
    path: '/application/dialog',
    exact: true,
    component: DialogPage,
    meta: {
      titleId: 'title.application.dialog'
    }
  },
  {
    path: '/application/complex',
    exact: true,
    component: ComplexPage,
    meta: {
      titleId: 'title.application.complex'
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
