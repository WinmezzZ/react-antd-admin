import { Modal } from 'antd';
import type { FC } from 'react';

const BaseModal: FC = props => {
  return <Modal {...props} />;
};

const MyModal = Object.assign(Modal, BaseModal);

export default MyModal;
