import React, { FC } from 'react';
import { Modal } from 'antd';

const MyModal: FC = props => {
  return <Modal {...props} />;
};

export default Object.assign(MyModal, Modal);
