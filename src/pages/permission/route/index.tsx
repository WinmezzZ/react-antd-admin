import { FC } from 'react';
import { LocaleFormatter } from '@/locales';
import './index.less';

const RoutePermissionPage: FC = () => {
  return (
    <div className="permission-page">
      <p className="permission-intro">
        <LocaleFormatter id="gloabal.tips.loginResult" />
      </p>
    </div>
  );
};

export default RoutePermissionPage;
