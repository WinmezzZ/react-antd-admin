import { CheckboxProps } from 'antd/lib/checkbox';
import { DatePickerProps } from 'antd/lib/date-picker';
import { FormItemProps } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { RadioGroupProps } from 'antd/lib/radio';
import { SelectProps } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';

// Basic component, no additional configuration required
// 基础控件，无需额外配置
export const basicControls = ['input', 'input-number', 'switch', 'date-picker'] as const;
// Complex controls that need to combine specific data
// 复杂控件，需组合特定参数
export const advancedControls = ['checkbox', 'radio', 'select', 'text'] as const;

type ValuesType<T> = T extends { [index: number]: infer Value } ? Value : T;

// Types are extracted from constants, safe, reliable and easy to extend
// 类型从常量中提取，安全可靠易扩展
export type BasicControls = ValuesType<typeof basicControls>;
export type AdvancedControls = ValuesType<typeof advancedControls>;
export type Controls = BasicControls | AdvancedControls;

export interface AdvancedControlPropsOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface CustomFormItemProps<T> extends Omit<FormItemProps, 'required'> {
  /** inner control props, support antd form control and custom control */
  innerProps?: T extends Controls ? InnerProps[T] : Record<string, any>;
  required?: string | boolean;
}

// All props of the basic control, extended from ant-design FormItem
// 基础控件的所有参数，继承自 ant-design FormItem 的 props
export interface BasicControlProps<T extends BasicControls> extends CustomFormItemProps<T> {
  type: T;
}

export interface AdvancedControlProps<T extends AdvancedControls> extends CustomFormItemProps<T> {
  type: T;
  options: AdvancedControlPropsOption[];
}

export interface CustomControlProps<T extends undefined> extends CustomFormItemProps<T> {
  type?: T;
}

interface InnerProps {
  input: InputProps;
  'input-number': InputNumberProps;
  switch: SwitchProps;
  'date-picker': DatePickerProps;
  checkbox: CheckboxProps;
  radio: RadioGroupProps;
  select: SelectProps<any>;
  text: Record<string, any>;
}

export type MyFormItemProps<T> = T extends BasicControls
  ? BasicControlProps<T>
  : T extends AdvancedControls
  ? AdvancedControlProps<T>
  : CustomControlProps<undefined>;
