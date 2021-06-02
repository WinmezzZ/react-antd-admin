import React, { FC } from 'react';
import { InputNumber } from 'antd';

const MyInputNumber: FC = props => {
  return <InputNumber {...props} />;
};

export default Object.assign(MyInputNumber, InputNumber);
