import { FC, lazy } from 'react'
import renderRoutes from './config'

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

const MainRoutes: FC = () =>
  renderRoutes([
    {
      path: ['/', '/dashboard'],
      exact: true,
      component: Dashboard,
      meta: {
        title: '控制台'
      }
    },
    {
      path: '/guide',
      exact: true,
      component: Guide,
      meta: {
        title: '权限-页面权限'
      }
    },
    {
      path: '/permission/page',
      exact: true,
      component: PagePage,
      meta: {
        title: '权限-页面权限',
        auth: true
      }
    },
    {
      path: '/permission/button',
      exact: true,
      component: ButtonPage,
      meta: {
        title: '权限-按钮权限'
      }
    },
    {
      path: '/permission/data',
      exact: true,
      component: DataPage,
      meta: {
        title: '权限-数据权限'
      }
    },
    {
      path: '/application/form',
      exact: true,
      component: FormPage,
      meta: {
        title: '应用-表单'
      }
    },
    {
      path: '/application/table',
      exact: true,
      component: TablePage,
      meta: {
        title: '应用-表格'
      }
    },
    {
      path: '/application/dialog',
      exact: true,
      component: DialogPage,
      meta: {
        title: '应用-表单'
      }
    },
    {
      path: '/application/complex',
      exact: true,
      component: ComplexPage,
      meta: {
        title: '应用-综合'
      }
    },
    {
      path: '/account',
      exact: true,
      component: AccountPage,
      meta: {
        title: '个人设置'
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        title: '页面不存在'
      }
    }
  ])

export default MainRoutes
