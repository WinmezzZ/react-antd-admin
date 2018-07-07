import React from 'react';
import { register } from '@/api';
import { Form, Icon, Input, Button, message } from 'ant';
import '../login/index.less';
const FormItem = Form.Item;

@Form.create()
export default class App extends React.Component {
  componentDidMount() {
    document.title = '注册'
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (err) return;
      const res = await register(values);
      if (res.code === 1) {
        message.error(res.msg);
      } else if (res.code === 0) {
        message.success('注册成功！2秒后将自动跳转到首页...', 2, () => {
          this.props.history.push('/admin/index');
        })
      }
    });
  }
  handleLogin = () => {
    this.props.history.push('/login');
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
            <Button type="primary" htmlType="submit" className="login-form-button">
             注册
            </Button>
            <a onClick={this.handleLogin}>去登录</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}