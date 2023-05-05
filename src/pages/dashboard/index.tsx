import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import Page from '@/components/Page';

import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Page>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </Page>
  );
};

export default DashBoardPage;
