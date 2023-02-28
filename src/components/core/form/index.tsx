import type { ControlTypes, MyFormItemProps } from '../form-item';
import MyFormItem from '../form-item';
import { Form } from 'antd';
import type { FormProps } from 'antd/es/form/Form';

export interface MyFormOptions extends Array<MyFormItemProps<ControlTypes>> {}

export interface MyFormProps<T> extends FormProps<T> {
  options?: MyFormOptions;
}

const BaseForm = <Values extends object>(props: MyFormProps<Values>) => {
  const { options, children, ...rest } = props;

  return (
    <Form<Values> {...rest}>
      {options?.map(option => {
        return <MyFormItem {...option} />;
      })}
      {children}
    </Form>
  );
};

const MyForm = Object.assign(BaseForm, Form, { Item: MyFormItem });

export default MyForm;
