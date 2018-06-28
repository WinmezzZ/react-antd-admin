import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import Organization from '@/components/organizationSelect'
import StationSelect from '@/components/stationSelect'
import DeviceType from '@/components/deviceType'
import { common, getStationByArea } from '@/api'
import moment from 'moment'
import { Form, Input, Select, DatePicker, message, Row, Col } from 'antd'

class Alert extends Component {
  state = {
    disabled: true,
    title: '详情',
    okText: '编辑',
    stationList: []
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
  areaSelected = async(data) => {
    const res = await getStationByArea(data.value)
    this.setState({
      stationList: res.listInfo
    })
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
        tradeCode: data.isAdd ? 'device.insertSelective' : 'device.updateByPrimaryKeySelective',
        ...values,
        fScdate: values.fScdate.format('YYYY-MM-DD'),
        fAzdate: values.fAzdate.format('YYYY-MM-DD'),
        fDeviceid: values.fDeviceid || data.fDeviceid
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
    const { title, okText, disabled, stationList } = this.state
    const { data } = this.props
    const { isMobile } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    return (
      <Modal
        title={title}
        okText={okText}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={this.onCancel}
        width="800px">
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="设备编号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDeviceid', {
                  initialValue: data.fDeviceid,
                  rules: [{ required: true, whitespace: true, message: '请输入设备编号！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="设备名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevname', {
                  initialValue: data.fDevname,
                  rules: [{ required: true, whitespace: true, message: '请输入设备名称！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="设备类别:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevtype', {
                  initialValue: data.fDevtype,
                  rules: [{ required: true, whitespace: true, message: '请选择设备类别！' }],
                })(<DeviceType disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="设备型号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevmodel', {
                  initialValue: data.fDevmodel,
                  rules: [{ required: true, whitespace: true, message: '请输入设备型号！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="所属机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBranchid', {
                  initialValue: data.fBranchid,
                  rules: [{ required: true, whitespace: true, message: '请选择所属机构！'}],
                })(<Organization type="select" treeDefaultExpandAll disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAreaid', {
                  initialValue: data.fAreaid && { label: data.areaname, value: data.fAreaid },
                  rules: [{ required: true, whitespace: true, message: '请选择所属区域！', type: 'object' }],
                })(<StationSelect type="select" disabled={disabled} onSelect={this.areaSelected}/>)}
              </Form.Item>
              <Form.Item label="所属站点:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fStationid', {
                  rules: [{ required: true, whitespace: true, message: '请选择所属站点！' }]
                })(<Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {
                    stationList.map(item =>
                      <Select.Option key={item.fPid} value={item.fPid}>{item.fName}</Select.Option>
                    )
                  }
                </Select>)}
              </Form.Item>
              <Form.Item label="运维人员:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fContid', {
                  initialValue: data.fContid,
                  rules: [{ required: true, whitespace: true, message: '请输入运维人员！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="运维人员电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fConttel', {
                  initialValue: data.fConttel,
                  rules: [{ required: true, whitespace: true, message: '请输入运维人员电话！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="功率:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevpower', {
                  initialValue: data.fDevpower,
                  rules: [{ required: true, whitespace: true, message: '请输入功率！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="流量:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevflow', {
                  initialValue: data.fDevflow,
                  rules: [{ required: true, whitespace: true, message: '请输入流量！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="扬程:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDevyc', {
                  initialValue: data.fDevyc,
                  rules: [{ required: true, whitespace: true, message: '请输入扬程！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="厂家:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fFactory', {
                  initialValue: data.fFactory,
                  rules: [{ required: true, whitespace: true, message: '请输入厂家！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="使用年限:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSerlife', {
                  initialValue: data.fSerlife,
                  rules: [{ required: true, whitespace: true, message: '请输入使用年限！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="建设日期:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fScdate', {
                  initialValue: (data.fScdate && data.fScdate.indexOf('-') > -1 && moment(data.fScdate, 'YYYY-MM-DD')) || undefined,
                  rules: [{  type: 'object', required: true, message: '请输入建设日期！' }]
                })(<DatePicker style={{width: '100%'}} placeholder="" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="安装日期:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAzdate', {
                  initialValue: (data.fAzdate && data.fAzdate.indexOf('-') > -1 && moment(data.fAzdate, 'YYYY-MM-DD')) || undefined,
                  rules: [{ type: 'object', required: true, whitespace: true, message: '请输入安装日期！' }]
                })(<DatePicker style={{width: '100%'}} placeholder="" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fRemark', {
                  initialValue: data.fRemark,
                  valuePropName: 'file',
                  rules: [{ required: true, whitespace: true, message: '请输入备注！' }]
                })(<Input.TextArea autosize maxLength="60" disabled={disabled}/>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Form.create()(Alert))