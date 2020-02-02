import React, { FC } from 'react'
import { Modal } from 'antd'
import { Role } from '~/interface/permission/role.interface'
import useGetRoleFormItem from './useGetRoleForm'
import { useLocale } from '~/locales'

interface Values extends Role {}

interface RoleModifyDialogProps {
  visible: boolean
  onModify: (values: Values) => void
  onCancel: () => void
}

const RoleModifyDialog: FC<RoleModifyDialogProps> = ({ onModify, onCancel, visible }) => {
  const { Form, form, Name, Code, Status } = useGetRoleFormItem({ name: 'modifyForm', required: true })
  const { formatMessage } = useLocale()

  return (
    <Modal
      title={formatMessage({ id: 'gloabal.tips.modify' })}
      visible={visible}
      onOk={async () => onModify((await form.validateFields()) as any)}
      onCancel={onCancel}
    >
      <Form>
        <Name />
        <Code />
        <Status />
      </Form>
    </Modal>
  )
}

export default RoleModifyDialog
