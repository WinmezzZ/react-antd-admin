import React, { FC } from 'react';
import MyTabs, { MyTabOption } from 'components/business/tabs';

const options: MyTabOption[] = [
  {
    label: 'Tab-1',
    value: 1
  },
  {
    label: 'Tab-2',
    value: 2
  },
  {
    label: 'Tab-3',
    value: 3
  }
];

const TabsPage: FC = () => {
  return <MyTabs options={options} />;
};

export default TabsPage;
