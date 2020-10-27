import React, { FC } from 'react';
import { Modal } from 'antd';
import { Role } from 'interface/permission/role.interface';
import useGetRoleFormItem from './useGetRoleForm';
import { useLocale } from 'locales';

interface Values extends Role {}

interface RoleCreateDialogProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const RoleCreateDialog: FC<RoleCreateDialogProps> = ({ onCreate, onCancel, visible }) => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({ name: 'createForm', required: true });
  const { formatMessage } = useLocale();

  return (
    <Modal
      title={formatMessage({ id: 'gloabal.tips.create' })}
      visible={visible}
      onOk={async () => onCreate((await form.validateFields()) as any)}
      onCancel={onCancel}
    >
      <Form>
        <Name />
        <Code />
        <Status />
      </Form>
    </Modal>
  );
};

export default RoleCreateDialog;
