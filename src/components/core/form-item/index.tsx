import { useMemo } from 'react';
import { Form } from 'antd';
import { Controls, MyFormItemProps } from './types';
import { GetControl } from './get-control';

// Two types are used to constrain external props delivery. When the type attribute is one of the advancedControls, the options option is provided
// 使用 2 种类型来约束外部 props，当 type 属性为 advancedControls 中的一种时，需要提供 options 选项
const MyFormItem = <T extends Controls | undefined>(props: MyFormItemProps<T>) => {
  const { children, type, required: formItemRequired, innerProps, rules: formItemRules, ...rest } = props;

  const rules = useMemo(() => {
    // custom rules
    if (formItemRules) return formItemRules;

    // simple type of rule: required only
    if (formItemRequired) {
      // custom required message
      if (typeof formItemRequired === 'string') {
        return [{ required: true, message: formItemRequired }];
      }
      return [{ required: true }];
    }
  }, [formItemRequired, formItemRules]);

  const required = useMemo(() => {
    if (formItemRequired) return true;

    if (Array.isArray(rules) && rules.some(r => 'required' in r && r.required)) {
      return true;
    }
  }, [rules, formItemRequired]);

  // Why do we need to use class: To optimize readability and maintainability, otherwise we have to use a lot of if and else to handle the logic of various types
  // 为什么需要使用class：为了优化可读性和可维护性，否则只能使用大量的 if else 处理各种 type 的逻辑
  return (
    <Form.Item shouldUpdate noStyle>
      {instance => {
        return (
          <Form.Item {...rest} rules={rules} required={required}>
            {type ? new GetControl(props, instance)[type]((props as any).options) : props.children}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

export default MyFormItem;
