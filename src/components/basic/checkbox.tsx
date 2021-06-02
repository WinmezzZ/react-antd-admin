import React, { FC } from 'react';
import { Checkbox } from 'antd';

const MyCheckBox: FC = props => {
  return <Checkbox {...props} />;
};

export default Object.assign(MyCheckBox, Checkbox);
