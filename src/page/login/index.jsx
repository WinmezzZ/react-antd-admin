import React from 'react';
import { login } from '@/api'
import { Form, Icon, Input, Button, Checkbox, message } from 'ant';
import { setStore } from '@/utils';
import './index.less';
const FormItem = Form.Item;

@Form.create()
export default class App extends React.Component {
  componentDidMount() {
    document.title = '登陆'
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (err) return;
      const res = await login(values);
      if (res.code === 1) {
        message.error(res.msg);
      } else if (res.code === 0) {
        setStore('isLogin', true);
        this.props.history.push('/admin/index');
      }
    });
  }
  handleRegister = () => {
    this.props.history.push('/register');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-logo">
            <span>react-admin</span>
          </div>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userpwd', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem className="last">
            <Checkbox>记住用户</Checkbox>
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
             登录
            </Button>
            <a onClick={this.handleRegister}>去注册</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}