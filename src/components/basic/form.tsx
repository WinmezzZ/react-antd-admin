import React, { FC } from 'react';
import { Form } from 'antd';
import MyFormItem from 'components/core/form-item';
import InternalForm from 'antd/lib/form/Form';

const MyForm: FC = props => {
  return <Form {...props} />;
};

Object.assign(MyForm, Form, { Item: MyFormItem });

type FormType = Omit<typeof Form, 'Item'>;
type InternalFormType = typeof InternalForm;

interface MyFormInterface extends FormType, InternalFormType {
  Item: typeof MyFormItem;
}

export default MyForm as MyFormInterface;
