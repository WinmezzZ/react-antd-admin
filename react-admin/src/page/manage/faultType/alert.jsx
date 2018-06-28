import React, { Component } from 'react'
import Modal from '@/components/modal'
import { common, getFaultBig, getFaultSmall } from '@/api'
import { Form, Input, Select, message } from 'antd'

class Alert extends Component {
  state = {
    bigFault: [],
    smallFault: [],
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
        tradeCode: data.isAdd ? 'faulttype.insertSelective' : 'faulttype.updateByPrimaryKeySelective',
        ...values,
        oid: data.id
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  initData = async() => {
    const res =await Promise.all([getFaultBig(), getFaultSmall()])
    this.setState({
      bigFault: res[0].listInfo,
      smallFault: res[1].listInfo
    })
  }
  componentDidMount() {
    this.initData()
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  render() {
    const { bigFault, smallFault,title, okText, disabled } = this.state
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
          <Form.Item label="故障大类:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fCalssid', {
              initialValue: data.fCalssid,
              rules: [{ required: true, whitespace: true, message: '请选择故障大类！' }]
            })(<Select disabled={disabled}>
              {
                bigFault.map(item => 
                  <Select.Option key={item.fId} value={item.fId}>{item.fName}</Select.Option>
                )
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="故障小类:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fPartid', {
              initialValue: data.fPartid,
              rules: [{ required: true, whitespace: true, message: '请选择故障小类！' }]
            })(<Select disabled={disabled}>
              {
                smallFault.map(item => 
                  <Select.Option key={item.fId} value={item.fId}>{item.fName}</Select.Option>
                )
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="故障编号:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fFaultnum', {
              initialValue: data.fFaultnum,
              rules: [{ required: true, whitespace: true, message: '请输入故障编号！' }]
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="解决方案:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fSolution', {
              initialValue: data.fSolution,
            })(<Input maxLength="20" disabled={disabled}/>)}
          </Form.Item>
          <Form.Item label="备注:" {...formItemLayout} colon={false}>
            {getFieldDecorator('fPad', {
              initialValue: data.fPad,
            })(<Input.TextArea rows={2} maxLength="50" disabled={disabled}/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(Alert)