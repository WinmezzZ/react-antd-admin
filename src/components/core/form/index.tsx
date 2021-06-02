import React from 'react';
import { Form } from 'antd';
import FormItem from '../form-item';
import { FormProps } from 'antd/lib/form/Form';
import { Controls, MyFormItemProps } from '../form-item/types';
import MyFormItem from '../form-item';

export interface MyFormOptions extends Array<MyFormItemProps<Controls | undefined>> {}

export interface MyFormProps<T> extends FormProps<T> {
  options?: MyFormOptions;
}

const MyForm = <Values extends object>(props: MyFormProps<Values>) => {
  const { options, children } = props;
  return (
    <Form<Values> {...props}>
      {options
        ? options.map(option => {
            return <MyFormItem {...option} />;
          })
        : children}
    </Form>
  );
};

export default Object.assign(MyForm, Form, { Item: FormItem });
