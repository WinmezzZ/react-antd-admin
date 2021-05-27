import React, { FC } from 'react';
import { Checkbox } from 'antd';

const MyCheckBox: FC = props => {
  return <Checkbox {...props} />;
};

Object.assign(MyCheckBox, Checkbox);

export default (MyCheckBox as never) as typeof Checkbox;
