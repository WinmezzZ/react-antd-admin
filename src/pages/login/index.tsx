import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import './index.less'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setGlobalItem } from '~/actions/global.action'

interface FormState {
  username: string
  password: string
  checkd: boolean
}

const initialValues: FormState = {
  username: 'guest',
  password: 'guest',
  checkd: true
}

const LoginForm: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const onFinished = () => {
    dispatch(
      setGlobalItem({
        logged: true
      })
    )
    if (!location.pathname.includes('/login')) return
    const { from } = location.state || { from: { pathname: '/dashboard' } }
    history.push(from)
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
