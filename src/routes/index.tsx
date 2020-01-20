import { FC, lazy } from 'react'
import renderRoutes from './config'

const NotFound = lazy(() => import('~/pages/404'))
const Dashboard = lazy(() => import('~/pages/dashboard'))
const Guide = lazy(() => import('~/pages/guide'))
const PagePage = lazy(() => import('~/pages/permission/page'))
const ButtonPage = lazy(() => import('~/pages/permission/button'))
const DataPage = lazy(() => import('~/pages/permission/data'))
const FormPage = lazy(() => import('~/pages/application/form'))
const TablePage = lazy(() => import('~/pages/application/table'))
const DialogPage = lazy(() => import('~/pages/application/dialog'))
const ComplexPage = lazy(() => import('~/pages/application/complex'))

const MainRoutes: FC = () =>
  renderRoutes([
    {
      path: ['/', '/dashboard'],
      exact: true,
      component: Dashboard,
      meta: {
        title: '控制台',
        parent: '/'
      }
    },
    {
      path: '/guide',
      exact: true,
      component: Guide,
      meta: {
        title: '权限-页面权限',
        parent: '/'
      }
    },
    {
      path: '/permission/page',
      exact: true,
      component: PagePage,
      meta: {
        title: '权限-页面权限',
        parent: '/permission'
      }
    },
    {
      path: '/permission/button',
      exact: true,
      component: ButtonPage,
      meta: {
        title: '权限-按钮权限',
        parent: '/permission'
      }
    },
    {
      path: '/permission/data',
      exact: true,
      component: DataPage,
      meta: {
        title: '权限-数据权限',
        parent: '/permission'
      }
    },
    {
      path: '/application/form',
      exact: true,
      component: FormPage,
      meta: {
        title: '应用-表单',
        parent: '/application'
      }
    },
    {
      path: '/application/table',
      exact: true,
      component: TablePage,
      meta: {
        title: '应用-表格',
        parent: '/application'
      }
    },
    {
      path: '/application/dialog',
      exact: true,
      component: DialogPage,
      meta: {
        title: '应用-表单',
        parent: '/application'
      }
    },
    {
      path: '/application/complex',
      exact: true,
      component: ComplexPage,
      meta: {
        title: '应用-综合',
        parent: '/application'
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
