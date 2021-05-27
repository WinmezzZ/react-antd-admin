import React, { FC } from 'react';
import { Radio } from 'antd';

const MyRadio: FC = props => {
  return <Radio {...props} />;
};

Object.assign(MyRadio, Radio);

export default (MyRadio as never) as typeof Radio;
