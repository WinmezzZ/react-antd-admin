import { FC } from 'react';
import MyTabs, { MyTabsOption } from '@/components/business/tabs';

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
