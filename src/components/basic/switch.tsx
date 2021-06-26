import { FC } from 'react';
import { Switch } from 'antd';

const BaseSwitch: FC = ({ children, ...props }) => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
