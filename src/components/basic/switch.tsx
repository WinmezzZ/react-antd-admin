import React, { FC } from 'react';
import { Switch } from 'antd';

const MySwitch: FC = ({ children, ...props }) => {
  return <Switch {...props} />;
};

Object.assign(MySwitch, Switch);

export default (MySwitch as never) as typeof Switch;
