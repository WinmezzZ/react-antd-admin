import React, { FC, ReactNode } from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import MyInput from 'components/base/input';
import MyInputNumber from 'components/base/input-number';
import MySwitch from 'components/base/switch';
import MyDatePicker from 'components/base/date-picker';
import MyCheckBox from 'components/base/checkbox';
import MyRadio from 'components/base/radio';
import MySelect from 'components/base/select';

const FormItem = Form.Item;

const baseControls = ['input', 'input-number', 'switch', 'date-picker'] as const;
const advancedControls = ['checkbox', 'radio', 'select'] as const;
type BaseControls = typeof baseControls[number];
type AdvancedControls = typeof advancedControls[number];

interface BaseControlProps extends FormItemProps {
  type?: typeof baseControls[number];
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

type GetBaseControlsProps = {
  [x in BaseControls]: (props: BaseControlProps) => ReactNode;
};

type GetAdvancedControlsProps = {
  [x in AdvancedControls]: (props: AdvancedControlProps) => ReactNode;
};

class GetControl implements GetBaseControlsProps, GetAdvancedControlsProps {
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

const MyFormItem: FC<BaseControlProps | AdvancedControlProps> = props => {
  const { children, type, ...rest } = props;
  const control = type ? new GetControl()[type](props as never) : props.children;

  return <FormItem {...rest}>{control}</FormItem>;
};

export default MyFormItem;
