import type { FC } from 'react';

import './index.less';

import { Typography } from 'antd';

import Page from '@/components/Page';
import { LocaleFormatter } from '@/locales';

const RoutePermissionPage: FC = () => {
  return (
    <Page className="permission-page">
      <Typography className="permission-intro">
        <LocaleFormatter id="gloabal.tips.loginResult" />
      </Typography>
    </Page>
  );
};

export default RoutePermissionPage;
