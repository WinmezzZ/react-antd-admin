import type { MyTabsOption } from '@/components/business/tabs';
import type { FC } from 'react';

import MyTabs from '@/components/business/tabs';

const options: MyTabsOption[] = [
  {
    label: 'Tab-1',
    value: 1,
  },
  {
    label: 'Tab-2',
    value: 2,
  },
];

const TabsPage: FC = () => {
  return (
    <div>
      <MyTabs options={options} />
    </div>
  );
};

export default TabsPage;
