import './index.less';
import { LocaleFormatter } from '@/locales';
import { Typography } from 'antd';
import type { FC } from 'react';

const RoutePermissionPage: FC = () => {
  return (
    <div className="permission-page">
      <Typography className="permission-intro">
        <LocaleFormatter id="gloabal.tips.loginResult" />
      </Typography>
    </div>
  );
};

export default RoutePermissionPage;
