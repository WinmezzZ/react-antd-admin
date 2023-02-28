import { Radio } from 'antd';
import type { FC } from 'react';

const BaseRadio: FC = props => {
  return <Radio {...props} />;
};

const MyRadio = Object.assign(Radio, BaseRadio);

export default MyRadio;
