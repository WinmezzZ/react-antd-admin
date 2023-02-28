import { Input } from 'antd';
import type { FC } from 'react';

const BaseInput: FC = props => {
  return <Input {...props} />;
};

const MyInput = Object.assign(Input, BaseInput);

export default MyInput;
