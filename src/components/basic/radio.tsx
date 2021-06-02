import React, { FC } from 'react';
import { Radio } from 'antd';

const MyRadio: FC = props => {
  return <Radio {...props} />;
};

export default Object.assign(MyRadio, Radio);
