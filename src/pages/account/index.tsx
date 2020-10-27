import React, { FC } from 'react';
import { LocaleFormatter } from 'locales';

const DashBoardPage: FC = () => {
  return (
    <div>
      <LocaleFormatter id="app.settings.menuMap.basic" />
    </div>
  );
};

export default DashBoardPage;
