import { FormItemProps } from 'antd/lib/form';

// Basic component, no additional configuration required
// 基础控件，无需额外配置
export const basicControls = ['input', 'input-number', 'switch', 'date-picker'] as const;
// Complex controls that need to combine specific data
// 复杂控件，需组合特定参数
export const advancedControls = ['checkbox', 'radio', 'select'] as const;

// Types are extracted from constants, safe, reliable and easy to extend
// 类型从常量中提取，安全可靠易扩展
export type BasicControls = typeof basicControls[number];
export type AdvancedControls = typeof advancedControls[number];

interface AdvancedControlPropsOption {
  label: string;
  value: any;
  disabled?: boolean;
}

// All props of the basic control, extended from ant-design FormItem
// 基础控件的所有参数，继承自 ant-design FormItem 的 props
export interface BasicControlProps extends FormItemProps {
  type?: typeof basicControls[number];
}

export interface AdvancedControlProps extends FormItemProps {
  type: typeof advancedControls[number];
  options: AdvancedControlPropsOption[];
}
