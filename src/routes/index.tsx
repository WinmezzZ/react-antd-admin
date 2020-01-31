import React, { FC, lazy } from 'react'
import RenderRoutes, { RouteProps } from './config'

import Dashboard from '~/pages/dashboard'
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))
// const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard'"*/ '~/pages/dashboard'))
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '~/pages/guide'))
const PagePage = lazy(() => import(/* webpackChunkName: "permission-page'"*/ '~/pages/permission/page'))
const ButtonPage = lazy(() => import(/* webpackChunkName: "permission-button'"*/ '~/pages/permission/button'))
const DataPage = lazy(() => import(/* webpackChunkName: "permission-data'"*/ '~/pages/permission/data'))
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
    path: '/permission/page',
    exact: true,
    component: PagePage,
    meta: {
      titleId: 'title.permission.page',
      auth: true
    }
  },
  {
    path: '/permission/button',
    exact: true,
    component: ButtonPage,
    meta: {
      titleId: 'title.permission.button'
    }
  },
  {
    path: '/permission/data',
    exact: true,
    component: DataPage,
    meta: {
      titleId: 'title.permission.data'
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
      titleId: '404'
    }
  }
]

const MainRoutes: FC = () => <RenderRoutes routeTree={routerTree} />

export default MainRoutes
