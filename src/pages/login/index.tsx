import React, { FC } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './index.less'
import { useHistory } from 'react-router-dom'

interface FormState {
  username: string
  password: string
}

const LoginForm: FC = () => {
  const router = useHistory()

  const onFinished = () => {
    router.push('/')
  }

  return (
    <div className="login-page">
      <Form onFinish={onFinished} className="login-page-form" initialValues={{ checked: true }}>
        <h2>REACT ANTD ADMIN</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住用户</Checkbox>
          <a className="login-form-forgot" href="###">
            忘记密码
          </a>
          <Button htmlType="submit" className="login-page-form_button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
