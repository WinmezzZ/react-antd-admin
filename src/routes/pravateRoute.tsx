import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useLocale } from '@/locales';

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          {formatMessage({ id: 'gloabal.tips.goToLogin' })}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
