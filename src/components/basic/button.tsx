import React, { FC } from 'react';
import { Button } from 'antd';

const MyButton: FC = props => {
  return <Button {...props} />;
};

export default Object.assign(MyButton, Button);
