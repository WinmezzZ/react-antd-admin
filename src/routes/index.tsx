import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthRouter from './AuthRouter';
import RootErrorBoundary from './RootErrorBoundary';

const LoginPage = lazy(() => import('@/pages/login'));
const LayoutPage = lazy(() => import('@/pages/layout'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const NotFound = lazy(() => import('@/pages/404'));
const Documentation = lazy(() => import('@/pages/doucumentation'));
const Guide = lazy(() => import('@/pages/guide'));
const RoutePermission = lazy(() => import('@/pages/permission/route'));
const FormPage = lazy(() => import('@/pages/components/form'));
const TablePage = lazy(() => import('@/pages/components/table'));
const SearchPage = lazy(() => import('@/pages/components/search'));
const TabsPage = lazy(() => import('@/pages/components/tabs'));
const AsidePage = lazy(() => import('@/pages/components/aside'));
const RadioCardsPage = lazy(() => import('@/pages/components/radio-cards'));
const BusinessBasicPage = lazy(() => import('@/pages/business/basic'));
const BusinessWithSearchPage = lazy(() => import('@/pages/business/with-search'));
const BusinessWithAsidePage = lazy(() => import('@/pages/business/with-aside'));
const BusinessWithRadioCardsPage = lazy(() => import('@/pages/business/with-radio-cards'));
const BusinessWithTabsPage = lazy(() => import('@/pages/business/with-tabs'));

const rootRouter = createBrowserRouter(
  [
    {
      path: '/login',
      element: <AuthRouter element={<LoginPage />} />,
      handle: {
        title: 'title.login',
      },
    },
    {
      path: '/',
      element: <AuthRouter element={<LayoutPage />} />,
      ErrorBoundary: RootErrorBoundary,
      children: [
        {
          path: '',
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: <AuthRouter element={<DashboardPage />} />,
          handle: {
            title: 'title.dashboard',
          },
        },
        {
          path: 'documentation',
          element: <AuthRouter element={<Documentation />} />,
          handle: {
            title: 'title.documentation',
          },
        },
        {
          path: 'guide',
          element: <AuthRouter element={<Guide />} />,
          handle: {
            title: 'title.guide',
          },
        },
        {
          path: 'permission/route',
          element: <AuthRouter element={<RoutePermission />} />,
          handle: {
            title: 'title.permission.route',
            auth: true,
          },
        },
        {
          path: 'component/form',
          element: <AuthRouter element={<FormPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'component/table',
          element: <AuthRouter element={<TablePage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'component/search',
          element: <AuthRouter element={<SearchPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'component/tabs',
          element: <AuthRouter element={<TabsPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'component/aside',
          element: <AuthRouter element={<AsidePage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'component/radio-cards',
          element: <AuthRouter element={<RadioCardsPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'business/basic',
          element: <AuthRouter element={<BusinessBasicPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'business/with-search',
          element: <AuthRouter element={<BusinessWithSearchPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'business/with-aside',
          element: <AuthRouter element={<BusinessWithAsidePage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'business/with-radio-cards',
          element: <AuthRouter element={<BusinessWithRadioCardsPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: 'business/with-tabs',
          element: <AuthRouter element={<BusinessWithTabsPage />} />,
          handle: {
            title: 'title.account',
          },
        },
        {
          path: '*',
          element: <NotFound />,
          handle: {
            title: 'title.notFount',
          },
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_ROUTE_BASE_NAME },
);

export default rootRouter;
