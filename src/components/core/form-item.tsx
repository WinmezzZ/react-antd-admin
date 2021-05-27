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

interface AdvancedControlPropsOption {
  label: string;
  value: any;
  disabled: boolean;
}

// Basic component, no additional configuration required
// 基础控件，无需额外配置
const basicControls = ['input', 'input-number', 'switch', 'date-picker'] as const;
// Complex controls that need to combine specific data
// 复杂控件，需组合特定参数
const advancedControls = ['checkbox', 'radio', 'select'] as const;
// Types are extracted from constants, safe, reliable and easy to extend
// 类型从常量中提取，安全可靠易扩展
type BasicControls = typeof basicControls[number];
type AdvancedControls = typeof advancedControls[number];

// All props of the basic control, extended from ant-design FormItem
// 基础控件的所有参数，继承自 ant-design FormItem 的 props
interface BasicControlProps extends FormItemProps {
  type?: typeof basicControls[number];
}
interface AdvancedControlProps extends FormItemProps {
  type: typeof advancedControls[number];
  options: AdvancedControlPropsOption[];
}

// Method member must be one of BasicControls, provide BasicControlProps arguments, and return ReactNode
// 方法成员必须名字为 basicControls 其中之一，提供 BasicControlProps 参数，返回 ReactNode
type GetBasicControlsProps = {
  [x in BasicControls]: (props: BasicControlProps) => ReactNode;
};

type GetAdvancedControlsProps = {
  [x in AdvancedControls]: (props: AdvancedControlProps) => ReactNode;
};

// Why implements: Prevent incorrect member names, and prevent missing members
// 为什么要 implements：防止成员名写错，防止成员遗漏
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
  // Arguments is provided by MyFormItem component, as detailed in line 77
  // props 参数由 MyFormItem 组件提供，详情见第 77 行
  checkbox({ options }: AdvancedControlProps) {
    if (options.length === 1) return <MyCheckBox />;
    return <MyCheckBox.Group options={options} />;
  }
  radio(props: AdvancedControlProps) {
    if (props.options.length === 1) return <MyRadio />;
    return <MyRadio.Group options={props.options} />;
  }
  select(props: AdvancedControlProps) {
    return <MySelect options={props.options} />;
  }
}
// Two types are used to constrain external props delivery. When the type attribute is one of the advancedControls, the options option is provided
// 使用 2 种类型来约束外部 props，当 type 属性为 advancedControls 中的一种时，需要提供 options 选项
const MyFormItem: FC<BasicControlProps | AdvancedControlProps> = props => {
  const { children, type, ...rest } = props;
  // Why do we need to use class: To optimize readability and maintainability, otherwise we have to use a lot of if and else to handle the logic of various types
  // 为什么需要使用class：为了优化可读性和可维护性，否则只能使用大量的 if else 处理各种 type 的逻辑
  const control = type ? new GetControl()[type](props as never) : props.children;

  return <Form.Item {...rest}>{control}</Form.Item>;
};

export default MyFormItem;
