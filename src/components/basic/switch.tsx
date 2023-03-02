import type { FC } from 'react';

import { Switch } from 'antd';

const BaseSwitch: FC = ({ children: _, ...props }) => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
