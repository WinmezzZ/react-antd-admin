import React, { Component } from 'react'
import Modal from '@/components/modal'
import MenuTree from '@/components/menuTree'
import { common } from '@/api'
import { Form ,Input, message, Select } from 'antd'

class App extends Component {
  state = {
    checkedKeys: [],
    disabled: true,
    title: '详情',
    okText: '编辑'
  }
  componentDidMount() {
    this.setState({
      checkedKeys: this.props.data.menuid && this.props.data.menuid.split(',')
    })
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  onCancel = (e) => {
    if(this.state.title === '编辑' && e.currentTarget.className === 'ant-btn') {
      this.setState({ 
        disabled: true, title: '详情', okText: '编辑' 
      })
      return this.props.form.resetFields()
    }
    this.props.trigger(false)
  }
  handleSubmit = () => {
    const { state: { checkedKeys, disabled }, props: { data } } = this
    if(disabled) {
      this.setState({ disabled: false, title: '编辑', okText: '确定' })
      return
    }
    this.props.form.validateFields(async (err, values) => {
      if(err) return
      const res = await common({
        tradeCodeList: data.isAdd ? 'userrole.insertSelective,userrolemenu.insertRoleMenu' : 'userrole.updateByPrimaryKeySelective,userrolemenu.deleteByPrimaryKey,userrolemenu.insertRoleMenu',
        ...values,
        toList: 'fRoleMenu',
        fRoleMenu: checkedKeys ? checkedKeys.toString() : '',
        fRoleid: data.fRoleid
      })
      if (res.rspCode === '00') {
        message.success('操作成功！')
        this.props.trigger(true)
      } else if (res.rspCode === '99') {
        message.error('角色名称已存在，请重新输入！')
      } else {
        message.error('系统繁忙，请稍后再试！')
      }
    })
  }
  c = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }
  render() {
    const { disabled, title, okText, checkedKeys } = this.state;
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 ,offset: 1},
      wrapperCol: { span: 16 ,offset: 1},
    };
    return (
      <Modal 
        title={title}
        okText={okText}
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={e => this.onCancel(e)}
        width="750px">
        <Form className="form">
          <ul>
            <li style={{width:'50%'}}>
              <Form.Item label="角色名称" {...formItemLayout}>
              {getFieldDecorator('fName', {
                initialValue: data.fName,
                rules: [{ required: true, message: '请输入角色名称！', whitespace: true }],
              })(
                <Input disabled={disabled}/>
              )}
              </Form.Item>
            </li>
            <li style={{width:'50%'}}>
            <Form.Item label="角色类型" {...formItemLayout}>
              {getFieldDecorator('fType', {
                initialValue: data.fType,
                rules: [{ required: true, message: '请选择角色类型！', whitespace: true }],
              })(
                <Select placeholder="请选择" disabled={disabled}>
                  <Select.Option value="0">直营</Select.Option>
                  <Select.Option value="1">加盟</Select.Option>
                </Select>
              )}
            </Form.Item>
            </li>
          </ul>
        </Form>
        <MenuTree checkedKeys={checkedKeys} onChecked={this.c} disabled={disabled}/>
      </Modal>
    )
  }
}

export default Form.create()(App)
