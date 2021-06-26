import { FC } from 'react';
import { Input } from 'antd';

const BaseInput: FC = props => {
  return <Input {...props} />;
};

const MyInput = Object.assign(Input, BaseInput);

export default MyInput;
