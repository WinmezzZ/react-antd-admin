import React, { Component } from 'react'
import Modal from '@/components/modal'
import { updateStandard, addStandard } from '@/api'
import { Form, Input, message } from 'antd'

class Alert extends Component {
  state = {
    standardNameList: [],
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
      const params = {
        ...values,
        fId: data.fId
      }
      const res = data.isAdd ? await addStandard(params) : await updateStandard(params)
      if(res.result === '0') {
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
          <Form.Item label="标准名称:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fStandardname', {
              initialValue: data.fStandardname,
              rules: [{ required: true, whitespace: true, message: '请输入出水标准名称！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="PH:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fPh', {
              initialValue: data.fPh,
              rules: [{ required: true, whitespace: true, message: '请输入PH！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="Cod:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fCod', {
              initialValue: data.fCod,
              rules: [{ required: true, whitespace: true, message: '请输入Cod！' }]
            })(<Input maxLength="20" addonAfter="(mg/L)" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="Bod:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fBod', {
              initialValue: data.fBod,
              rules: [{ required: true, whitespace: true, message: '请输入Bod！' }]
            })(<Input maxLength="20" addonAfter="(mg/L)" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="氨氮:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fAd', {
              initialValue: data.fAd,
              rules: [{ required: true, whitespace: true, message: '请输入氨氮！' }]
            })(<Input maxLength="20" addonAfter="(mg/L)" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="总磷:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fPhosphorus', {
              initialValue: data.fPhosphorus,
              rules: [{ required: true, whitespace: true, message: '请输入总磷！' }]
            })(<Input maxLength="20" addonAfter="(mg/L)" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="总氮:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fNitrogen', {
              initialValue: data.fNitrogen,
              rules: [{ required: true, whitespace: true, message: '请输入总氮！' }]
            })(<Input maxLength="20" addonAfter="(mg/L)" disabled={disabled}/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(Alert)