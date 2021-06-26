import { FC } from 'react';
import { InputNumber } from 'antd';

const BaseInputNumber: FC = props => {
  return <InputNumber {...props} />;
};

const MyInputNumber = Object.assign(InputNumber, BaseInputNumber);

export default MyInputNumber;
