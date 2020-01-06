import { FC, lazy } from 'react'
import renderRoutes from './config'

const Layout = lazy(() => import('~/pages/layout'))

const MainRoutes: FC = () =>
  renderRoutes([
    {
      path: '/dashboard',
      component: Layout
    }
  ])

export default MainRoutes
