import { FC } from 'react';
import { Modal } from 'antd';

const BaseModal: FC = props => {
  return <Modal {...props} />;
};

const MyModal = Object.assign(Modal, BaseModal);

export default MyModal;
