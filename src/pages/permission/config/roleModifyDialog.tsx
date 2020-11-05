import React, { FC } from 'react';
import { Modal } from 'antd';
import { Role } from 'interface/permission/role.interface';
import useGetRoleFormItem from './useGetRoleForm';
import { useLocale } from 'locales';

interface RoleModifyDialogProps {
  values: Role;
  visible: boolean;
  onModify: (values: Role) => void;
  onCancel: () => void;
}

const RoleModifyDialog: FC<RoleModifyDialogProps> = ({ onModify, onCancel, visible, values }) => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({ name: 'modifyForm', required: true, values });
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values: any = await form.validateFields();
    onModify(values);
  };

  return (
    <Modal title={formatMessage({ id: 'gloabal.tips.modify' })} visible={visible} onOk={onSubmit} onCancel={onCancel}>
      <Form>
        <Name />
        <Code />
        <Status />
      </Form>
    </Modal>
  );
};

export default RoleModifyDialog;
