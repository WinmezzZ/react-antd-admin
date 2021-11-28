import { FC, lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import LoginPage from '~/views/user/login';

const LayoutPage = lazy(() => import('~/views/index'));
const NodeMgrPage = lazy(() => import('~/views/nodemgr/index'));
const NodeMgrNodeListPage = lazy(() => import('~/views/nodemgr/node-list'));
const NodeMgrNodeGroupListPage = lazy(() => import('~/views/nodemgr/node-group'));

const routeList: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '',
    caseSensitive: true,
    element: <LayoutPage />,
    children: [
      {
        path: '',
        caseSensitive: true,
        element: <Navigate to="nodemgr" />,
      },
      {
        path: 'nodemgr',
        caseSensitive: true,
        element: <NodeMgrPage />,
        children: [
          {
            path: '',
            caseSensitive: true,
            element: <Navigate to="list" />,
          },
          {
            path: 'list',
            caseSensitive: true,
            element: <NodeMgrNodeListPage />,
          },
          {
            path: 'group',
            caseSensitive: true,
            element: <NodeMgrNodeGroupListPage />,
          },
          {
            path: '*',
            element: <h1>404</h1>,
          },
        ],
      },

      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
  {
    path: '*',
    element: <h1>404</h1>,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
