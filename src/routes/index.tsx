import React, { lazy, FC } from 'react'

import Dashboard from '~/pages/dashboard'
import LoginPage from '~/pages/login'
import LayoutPage from '~/pages/layout'
import { RouteProps } from './config'
import { Routes, Route } from 'react-router'
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/doucumentation'))
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '~/pages/guide'))
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '~/pages/permission/route'))
const ButtonPermission = lazy(() => import(/* webpackChunkName: "button-permission"*/ '~/pages/permission/button'))
const PermissionConfig = lazy(() => import(/* webpackChunkName: "permission-config'"*/ '~/pages/permission/config'))
const AccountPage = lazy(() => import(/* webpackChunkName: "account'"*/ '~/pages/account'))

export const routeList: RouteProps[] = [
  {
    path: 'login',
    element: <LoginPage />,
    meta: {
      titleId: 'title.login'
    }
  },
  {
    path: '',
    element: <LayoutPage />,
    meta: {
      titleId: ''
    },
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        meta: {
          titleId: 'title.dashboard'
        }
      },
      {
        path: 'documentation',
        element: <Documentation />,
        meta: {
          titleId: 'title.documentation'
        }
      },
      {
        path: 'guide',
        element: <Guide />,
        meta: {
          titleId: 'title.guide'
        }
      },
      {
        path: 'permission/route',
        element: <RoutePermission />,
        meta: {
          titleId: 'title.permission.route',
          auth: true
        }
      },
      {
        path: 'permission/button',
        element: <ButtonPermission />,
        meta: {
          titleId: 'title.permission.button'
        }
      },
      {
        path: 'permission/config',
        element: <PermissionConfig />,
        meta: {
          titleId: 'title.permission.config'
        }
      },
      {
        path: 'account',
        element: <AccountPage />,
        meta: {
          titleId: 'title.account'
        }
      },
      {
        path: '*',
        element: <NotFound />,
        meta: {
          titleId: 'title.notFount'
        }
      }
    ]
  }
]

export const RenderRoutes: FC = () => {
  return (
    <Routes>
      {routeList.map(route => (
        <Route path={route.path} element={route.element} key={route.path}>
          {route.children?.map(child => (
            <Route path={child.path} element={child.element} key={child.path} />
          ))}
        </Route>
      ))}
    </Routes>
  )
}
