import type { FC, ReactNode } from 'react';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useMatches, useNavigate } from 'react-router-dom';

import { useLocale } from '@/locales';
import UnauthorizedPage from '@/pages/401';

interface AuthRouterProps {
  element: JSX.Element;
}

const AuthRouter: FC<AuthRouterProps> = props => {
  const { logged } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const { element } = props;
  const matches = useMatches();
  const location = useLocation();
  // 当前匹配的路由
  const matched = matches.find(i => i.pathname === location.pathname && i.handle) as any;

  document.title = matched?.handle.title ? formatMessage({ id: matched?.handle.title }) : '';

  const page = useMemo(() => {
    if (matched) {
      const { auth, roles } = matched.handle as any;

      // 拦截未登录
      if (!logged && auth) {
        return (
          <Navigate
            to={{ pathname: '/login', search: `from=${encodeURIComponent(location.pathname + location.search)}` }}
            replace
          />
        );
      }

      // if (!permissionList.includes(location.pathname)) {
      //   return <Navigate to="/401" replace />;
      // }

      // // 拦截无权限
      // if (roles?.length > 0 && !roleKeys.some(role => roles.includes(role))) {
      //   return <UnauthorizedPage />;
      // }
    }

    return element;
  }, [logged, matches]);

  return page;
};

export default AuthRouter;
