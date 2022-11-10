import { FC } from 'react';
import { LocaleFormatter } from '@/locales';
import './index.less';
import { Typography } from 'antd';

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
