import { Switch } from 'antd';
import type { FC } from 'react';

const BaseSwitch: FC = ({ children: _, ...props }) => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
