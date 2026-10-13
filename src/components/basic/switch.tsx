import type { SwitchProps } from 'antd';
import type { FC } from 'react';

import { Switch } from 'antd';

const BaseSwitch: FC<React.PropsWithChildren<SwitchProps>> = ({ children: _, ...props }) => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
