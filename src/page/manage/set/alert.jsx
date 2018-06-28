import React, { Component } from 'react'
import Modal from '@/components/modal'
import { common } from '@/api'
import { Form, Input, message } from 'antd'

class Alert extends Component {
  state = {
    disabled: true,
    title: '详情',
    okText: '编辑'
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
  submitHandle = () => {
    const { state: { disabled }, props: { data } } = this
    if(disabled) {
      this.setState({ disabled: false, title: '编辑', okText: '确定' })
      return
    }
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.isAdd ? 'code.insertSelective' : 'code.updateByPrimaryKeySelective',
        ...values,
        ofCatid: values.fCatid,
        ofId: values.fId
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  componentDidMount() {
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  render() {
    const { disabled, title, okText } = this.state
    const { data } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Modal
        title={title}
        okText={okText}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={e => this.onCancel(e)}
        width="500px">
        <Form className="form">
          <Form.Item label="分类代码:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fCatid', {
              initialValue: data.fCatid,
              rules: [{ required: true, whitespace: true, message: '请输入分类代码！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="代码:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fId', {
              initialValue: data.fId,
              rules: [{ required: true, whitespace: true, message: '请输入代码！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="代码名称:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fName', {
              initialValue: data.fName,
              rules: [{ required: true, whitespace: true, message: '请输入代码名称！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          {/* <Form.Item label="解决方案:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fSolution', {
              initialValue: data.fSolution,
              rules: [{ required: true, whitespace: true, message: '请输入解决方案！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item> */}
          <Form.Item label="备注:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fNote', {
              initialValue: data.fNote,
              rules: [{ required: true, whitespace: true, message: '请输入备注！' }]
            })(<Input.TextArea rows={2} maxLength="50" disabled={disabled}/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(Alert)