import React, { FC } from 'react';
import { Button } from 'antd';

const MyButton: FC = props => {
  return <Button {...props} />;
};

Object.assign(MyButton, Button);

export default MyButton as typeof Button;
