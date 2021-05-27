import React, { FC } from 'react';
import { Input } from 'antd';

const MyInput: FC = props => {
  return <Input {...props} />;
};

Object.assign(MyInput, Input);

export default (MyInput as never) as typeof Input;
