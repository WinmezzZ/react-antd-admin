import React from 'react';
import { connect } from 'react-redux'
import md5 from 'js-md5';
import { login } from '@/api'
import './index.scss'
// import { setStore } from '@/utils'
import Routes from '@/route'
import Sider from '@/components/sider'
import Header from '@/components/header'
import { Layout, BackTop, Form, Icon, Input, Button, message, Row, Col, Calendar } from 'antd';
const FormItem = Form.Item

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			clientWidth: document.body.clientWidth
		}
	}
	componentDidMount() {
		window.onresize = () => {
      this.setState({
        clientWidth: document.body.clientWidth
      })
    }
	}
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
      	console.log(values)
        const res = await login({
        	name: values.name,
          password: md5(values.password)
        });
        if (res.rspCode === '00') {
        	this.props.history.push('/app');
        }else {
        	message.error('用户名或密码错误！');
        }
      }
    });
  }
	render() {
    const { isMobile } = this.props.size
		const { getFieldDecorator } = this.props.form;
		return (
      <Row 
        className="bg" 
        type="flex" 
        align="middle"
        style={{background: isMobile && '#499CE7'}}>
				{/* <img src={require('@imgs/logo_name.jpg')} className="logo-name" alt="logo" style={{width: isMobile&&'100%'}}/> */}
          <Col style={{marginTop: !isMobile && -210}}
            xxl={{span: 5, offset: 16}}
            xl={{span: 6, offset: 15}}
            lg={{span: 7, offset: 14}} 
            md={{span: 10, offset: 7}} 
            sm={{span: 12, offset: 6}} 
            xs={{span: 20, offset: 2}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <img src={require('@/style/imgs/login_logo.png')} className="logo1" alt="logo"></img>
              <FormItem>
                {getFieldDecorator('name', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入用户名！' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem style={{marginTop: 30}}>
                {getFieldDecorator('password', {
                  initialValue: '111111',
                  rules: [{ required: true, message: '请输入密码！' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <div className="form-forget">忘记密码？</div>
              <FormItem style={{marginBottom: 0}}>
                {/*getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住用户</Checkbox>
                )*/}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>
          </Col>
					{
						isMobile ? ( 
						<div className="copy-right">
							<p>版权所有 Copyright(C)2015</p>
							<p>上海碧兰环保技术开发有限公司</p>
						</div>
						) : (<p className="copy-right">版权所有 Copyright(C)2015 上海碧兰环保技术开发有限公司</p>)
					}
				
			</Row>
		)
	}
}
const mapStateToProps = state => state

export default connect(mapStateToProps)(Form.create()(LoginForm))

