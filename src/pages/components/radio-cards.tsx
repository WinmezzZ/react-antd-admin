import type { MyRadioCardssOption } from '@/components/business/radio-cards';
import type { FC } from 'react';

import MyRadioCards from '@/components/business/radio-cards';

const options: MyRadioCardssOption[] = [
  {
    label: 'Option-1',
    value: 1,
  },
  {
    label: 'Option-2',
    value: 2,
  },
  {
    label: 'Option-3',
    value: 3,
  },
];

const TabsPage: FC = () => {
  return <MyRadioCards options={options} defaultValue={1} />;
};

export default TabsPage;
