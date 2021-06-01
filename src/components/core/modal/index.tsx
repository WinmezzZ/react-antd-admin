import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import MyForm from '../form';

interface MyModalProps<FormType extends object> extends ModalProps {
  form?: FormType;
  formProps?: FormType;
  children?: React.ReactNode;
}

const MyModal = <T extends object>(props: MyModalProps<T>) => {
  const { form, children, ...rest } = props;

  return <Modal {...rest}>{form ? <MyForm<T>>{children}</MyForm> : children}</Modal>;
};

MyModal.defaultProps = {
  width: '1000px'
};
