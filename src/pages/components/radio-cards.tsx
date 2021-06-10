import React, { FC } from 'react';
import MyRadioCards, { MyRadioCardssOption } from 'components/business/radio-cards';

const options: MyRadioCardssOption[] = [
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
  return <MyRadioCards options={options} defaultValue={1} />;
};

export default TabsPage;
