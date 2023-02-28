import { InputNumber } from 'antd';
import type { FC } from 'react';

const BaseInputNumber: FC = props => {
  return <InputNumber {...props} />;
};

const MyInputNumber = Object.assign(InputNumber, BaseInputNumber);

export default MyInputNumber;
