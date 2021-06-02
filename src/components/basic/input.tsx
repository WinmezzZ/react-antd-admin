import React, { FC } from 'react';
import { Input } from 'antd';

const MyInput: FC = props => {
  return <Input {...props} />;
};

export default Object.assign(MyInput, Input);
