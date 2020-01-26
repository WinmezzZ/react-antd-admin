import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './index.less'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAsync } from '~/actions/user.action'
import { LoginParams } from '~/interface/user/login'

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest'
  // remember: true
}

const LoginForm: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const onFinished = async (form: any) => {
    const res = Boolean(dispatch(await loginAsync(form)))
    if (res) {
      const { from } = location.state || { from: { pathname: '/dashboard' } }
      history.push(from)
    }
  }

  useEffect(() => {
    document.title = '登录'
  }, [])

  return (
    <div className="login-page">
      <Form onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
        <h2>REACT ANTD ADMIN</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input placeholder="用户名" defaultValue="guest" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input type="password" placeholder="密码" defaultValue="guest" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住用户</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-page-form_button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
