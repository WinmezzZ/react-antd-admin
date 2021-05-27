import React, { FC, ReactNode } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import MyInput from 'components/basic/input';
import MyInputNumber from 'components/basic/input-number';
import MySwitch from 'components/basic/switch';
import MyDatePicker from 'components/basic/date-picker';
import MyCheckBox from 'components/basic/checkbox';
import MyRadio from 'components/basic/radio';
import MySelect from 'components/basic/select';

const FormItem = Form.Item;

const basicControls = ['input', 'input-number', 'switch', 'date-picker'] as const;
const advancedControls = ['checkbox', 'radio', 'select'] as const;
type BasicControls = typeof basicControls[number];
type AdvancedControls = typeof advancedControls[number];

interface BasicControlProps extends FormItemProps {
  type?: typeof basicControls[number];
}
interface AdvancedControlPropsOption {
  label: string;
  value: any;
  disabled: boolean;
}
interface AdvancedControlProps extends FormItemProps {
  type: typeof advancedControls[number];
  options: AdvancedControlPropsOption[];
}

type GetBasicControlsProps = {
  [x in BasicControls]: (props: BasicControlProps) => ReactNode;
};

type GetAdvancedControlsProps = {
  [x in AdvancedControls]: (props: AdvancedControlProps) => ReactNode;
};

class GetControl implements GetBasicControlsProps, GetAdvancedControlsProps {
  input() {
    return <MyInput />;
  }
  'input-number'() {
    return <MyInputNumber />;
  }
  switch() {
    return <MySwitch />;
  }
  'date-picker'() {
    return <MyDatePicker />;
  }
  checkbox(props: AdvancedControlProps) {
    if (props.options.length === 1) return <MyCheckBox />;
    return <MyCheckBox.Group options={props.options} />;
  }
  radio(props: AdvancedControlProps) {
    if (props.options.length === 1) return <MyRadio />;
    return <MyRadio.Group options={props.options} />;
  }
  select(props: AdvancedControlProps) {
    return <MySelect options={props.options} />;
  }
}

const MyFormItem: FC<BasicControlProps | AdvancedControlProps> = props => {
  const { children, type, ...rest } = props;
  const control = type ? new GetControl()[type](props as never) : props.children;

  return <FormItem {...rest}>{control}</FormItem>;
};

export default MyFormItem;
