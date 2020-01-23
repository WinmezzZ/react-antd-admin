import React, { FC, useState } from 'react'
import { Button, Modal } from 'antd'
import FormPage from '../form'

const DialogPage: FC = () => {
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        基本对话框
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={() => setVisible1(true)}>
        表单输入对话框
      </Button>
      <Modal title="基本对话框" visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
        <p>内容...</p>
        <p>内容...</p>
        <p>内容...</p>
      </Modal>
      <Modal title="表单对话框" visible={visible1} onOk={() => setVisible1(false)} onCancel={() => setVisible1(false)}>
        <FormPage dialog />
      </Modal>
    </div>
  )
}

export default DialogPage
