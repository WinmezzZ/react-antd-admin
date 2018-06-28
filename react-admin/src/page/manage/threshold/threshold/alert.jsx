import React, { Component } from 'react'
import Modal from '@/components/modal'
import { common } from '@/api'
import { Form, Input, Select, message } from 'antd'

class Alert extends Component {
  state = {
    faultTypeList: [],
    disabled: true,
    title: '详情',
    okText: '编辑'
  }
  initData = async() => {
    const res = await common({
      tradeCode: 'faulttype.selectFaulttype'
    })
    this.setState({
      faultTypeList: res.listInfo
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
  submitHandle = () => {
    const { state: { disabled }, props: { data } } = this
    if(disabled) {
      this.setState({ disabled: false, title: '编辑', okText: '确定' })
      return
    }
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.isAdd ? 'faultThreshold.insertSelective' : 'faultThreshold.updateByPrimaryKeySelective',
        ...values,
        fThresholdid: values.fThresholdid || data.fThresholdid
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
    this.initData()
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  render() {
    const { faultTypeList, disabled, title, okText } = this.state
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
          <Form.Item label="编号:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fThresholdbh', {
              initialValue: data.fThresholdbh,
              rules: [{ required: true, whitespace: true, message: '请输入编号！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="名称:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fThresholdname', {
              initialValue: data.fThresholdname,
              rules: [{ required: true, whitespace: true, message: '请输入名称！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="固定值:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fFixedvalue', {
              initialValue: data.fFixedvalue,
              rules: [{ required: true, whitespace: true, message: '请输入固定值！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="最小值:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fMinivalue', {
              initialValue: data.fMinivalue,
              rules: [{ required: true, whitespace: true, message: '请输入最小值！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="最大值:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fMaxvalue', {
              initialValue: data.fMaxvalue,
              rules: [{ required: true, whitespace: true, message: '请输入最大值！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="错误类型:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fPad', {
              initialValue: data.fPad,
              rules: [{ required: true, whitespace: true, message: '请输入错误类型！' }]
            })(<Select disabled={disabled} showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              {
                faultTypeList.map(item => 
                  <Select.Option key={item.fId} value={item.fId}>{item.fName}</Select.Option>
                )
              }
            </Select>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(Alert)