import { FC, lazy } from 'react'
import renderRoutes from './config'

const Dashboard = lazy(() => import('~/pages/dashboard'))
const Guide = lazy(() => import('~/pages/guide'))
const PagePage = lazy(() => import('~/pages/permission/page'))
const ButtonPage = lazy(() => import('~/pages/permission/button'))
const DataPage = lazy(() => import('~/pages/permission/data'))

const MainRoutes: FC = () =>
  renderRoutes([
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        title: '控制台',
        parent: '/'
      }
    },
    {
      path: '/guide',
      component: Guide,
      meta: {
        title: '权限-页面权限',
        parent: '/'
      }
    },
    {
      path: '/permisson/page',
      component: PagePage,
      meta: {
        title: '权限-页面权限',
        parent: '/permisson'
      }
    },
    {
      path: '/permisson/button',
      component: ButtonPage,
      meta: {
        title: '权限-按钮权限',
        parent: '/permisson'
      }
    },
    {
      path: '/permisson/data',
      component: DataPage,
      meta: {
        title: '权限-数据权限',
        parent: '/permisson'
      }
    }
  ])

export default MainRoutes
