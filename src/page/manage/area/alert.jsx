import React, { Component } from 'react'
import Modal from '@/components/modal'
import StationSelect from '@/components/stationSelect/'
import { common } from '@/api'
import { Form, Input, message } from 'antd'

class Alert extends Component {
  state = {
    disabled: true,
    title: '详情',
    okText: '编辑'
  }
  componentDidMount() {
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
  submitHandle = () => {
    const { state: { disabled }, props: { data } } = this
    if(disabled) {
      this.setState({ disabled: false, title: '编辑', okText: '确定' })
      return
    }
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.isAdd ? 'area.insertSelective' : 'area.updateByPrimaryKeySelective',
        ...values,
        fUpbrno: values.fUpbrno.value,
        id: values.id || data.id,
        oid: values.id || data.id
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  render() {
    const { title, okText, disabled } = this.state
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
              <Form.Item label="区域代码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('id', {
                  initialValue: data.id,
                  rules: [{ required: true, whitespace: true, message: '请输入区域代码！' }]
                })(<Input maxLength="10" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="区域名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('label', {
                  initialValue: data.label,
                  rules: [{ required: true, whitespace: true, message: '请输入区域名称！' }]
                })(<Input maxLength="10" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="区域等级:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fLevel', {
                  initialValue: data.fLevel,
                  rules: [{ required: true, whitespace: true, message: '请输入区域等级！' }]
                })(<Input maxLength="10" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fUpbrno', {
                  initialValue: data.fUpbrno && { label: data.showname, value: data.fUpbrno },
                  rules: [{ required: true, whitespace: true, message: '请选择所属区域！', type: 'object' }]
                })(
                  <StationSelect type="select" disabled={disabled}/>
                )}
              </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Alert)