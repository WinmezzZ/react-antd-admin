import React, { FC } from 'react';
import { Form } from 'antd';
import FormItem from '../form-item';
import InternalForm from 'antd/lib/form/Form';

const MyForm: FC = props => {
  return <Form {...props} />;
};

Object.assign(MyForm, Form, { Item: FormItem });

type FormType = Omit<typeof Form, 'Item'>;
type InternalFormType = typeof InternalForm;

interface FormInterface extends FormType, InternalFormType {
  Item: typeof FormItem;
}

export default MyForm as FormInterface;
