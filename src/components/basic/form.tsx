import React, { FC } from 'react';
import { Form } from 'antd';
import MyFormItem from 'components/core/form-item';

const MyForm: FC = props => {
  return <Form {...props} />;
};

Object.assign(MyForm, Form, { Item: MyFormItem });

type MyFormInterface = typeof Form & {
  Item: typeof MyFormItem;
};

export default MyForm as MyFormInterface;
