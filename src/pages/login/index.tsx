import React, { FC } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import './index.less'
import { useHistory } from 'react-router-dom'

interface FormState {
  username: string
  password: string
}

interface Props extends FormComponentProps<FormState> {}

const LoginForm: FC<Props> = ({ form }) => {
  const router = useHistory()
  const { getFieldDecorator } = form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        router.push('/')
      }
    })
  }

  return (
    <div className="login-page">
      <Form onSubmit={handleSubmit} className="login-page-form">
        <h2>REACT ANTD ADMIN</h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }]
          })(<Input prefix={<Icon type="user" />} placeholder="用户名" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>记住用户</Checkbox>)}
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

const LoginPage = Form.create({ name: 'normal_login' })(LoginForm)

export default LoginPage
