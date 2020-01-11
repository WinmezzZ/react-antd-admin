import { FC, lazy } from 'react'
import renderRoutes from './config'

const NotFound = lazy(() => import('~/pages/404'))
const Dashboard = lazy(() => import('~/pages/dashboard'))
const Guide = lazy(() => import('~/pages/guide'))
const PagePage = lazy(() => import('~/pages/permission/page'))
const ButtonPage = lazy(() => import('~/pages/permission/button'))
const DataPage = lazy(() => import('~/pages/permission/data'))

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
      path: '*',
      component: NotFound,
      meta: {
        title: '页面不存在'
      }
    }
  ])

export default MainRoutes
