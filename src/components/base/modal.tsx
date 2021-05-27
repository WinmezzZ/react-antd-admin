import React, { FC } from 'react';
import { Modal } from 'antd';

const MyModal: FC = props => {
  return <Modal {...props} />;
};

Object.assign(MyModal, Modal);

export default MyModal as typeof Modal;
