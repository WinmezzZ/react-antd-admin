import type { MySideOption } from '@/components/business/aside';
import type { FC } from 'react';

import { Typography } from 'antd';

import MyAside from '@/components/business/aside';

const { Title } = Typography;

const options: MySideOption[] = [
  {
    title: 'Tab-1',
    key: 1,
  },
  {
    title: 'Tab-2',
    key: 2,
  },
  {
    title: 'Tab-3',
    key: 3,
  },
];

const SidePage: FC = () => {
  return (
    <div>
      <MyAside
        options={options}
        defaultSelectedKeys={[1]}
        header={<Title level={4}>Costom Header</Title>}
        footer={<Title level={5}>Costom Footer</Title>}
      />
    </div>
  );
};

export default SidePage;
