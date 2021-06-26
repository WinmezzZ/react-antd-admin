import { FC } from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';

interface MyButtonProps extends CheckboxProps {}

const BaseCheckBox: FC<MyButtonProps> = props => {
  return <Checkbox {...props} />;
};

const MyCheckBox = Object.assign(Checkbox, BaseCheckBox);

export default MyCheckBox;
