import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import type { FC } from 'react';

interface MyButtonProps extends ButtonProps {}

const BaseButton: FC<MyButtonProps> = props => {
  return <Button {...props} />;
};

const MyButton = Object.assign(Button, BaseButton);

export default MyButton;
