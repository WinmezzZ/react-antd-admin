import React, { FC } from 'react';
import { InputNumber } from 'antd';

const MyInputNumber: FC = props => {
  return <InputNumber {...props} />;
};

Object.assign(MyInputNumber, InputNumber);

export default MyInputNumber as typeof InputNumber;
