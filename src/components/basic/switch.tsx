import React, { FC } from 'react';
import { Switch } from 'antd';

const MySwitch: FC = ({ children, ...props }) => {
  return <Switch {...props} />;
};

export default Object.assign(MySwitch, Switch);
