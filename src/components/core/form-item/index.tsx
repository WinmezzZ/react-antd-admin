import React, { FC } from 'react';
import { Form } from 'antd';
import { AdvancedControlProps, BasicControlProps } from './types';
import { GetControl } from './get-control';

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
