import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import Organization from '@/components/organizationSelect'
import StationSelect from '@/components/stationSelect'
import DeviceType from '@/components/deviceType'
import { common, getCraftList, getStandardName } from '@/api'
import moment from 'moment'
import { baseUrl } from '@/api/request.js'
import { Form, Input, Select, DatePicker, Upload, message, Row, Col, Icon } from 'antd'

class Alert extends Component {
  state = {
    loading: false,
    imageUrl: '',
    craftList: [],
    standardNameList: [],
    deviceList: [],
    disabled: true,
    title: '详情',
    okText: '编辑'
  }
  componentDidMount() {
    this.initData()
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  initData = async() => {
    const res = await Promise.all([getCraftList(), getStandardName()])
    console.log(res)
    this.setState({
      craftList: res[0].listInfo,
      standardNameList: res[1].data
    })
  }
  beforeUpload = (file) => {
    const isJPG = file.type.includes('image');
    if (!isJPG) {
      message.error('只能上传图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传的图片大小不能超过2M！');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
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
        tradeCode: data.isAdd ? 'station.insertSelective' : 'station.updateByPrimaryKeySelective',
        ...values,
        fBuilddate: values.fBuilddate.format('YYYY-MM-DD'),
        fAreaid: values.fAreaid.value,
        fPhotoOne: values.fPhotoOne.file.response.fPic1,
        fPid: data.fPid,
        ofPid: data.fPid,
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
    const { craftList, standardNameList, loading, imageUrl, disabled, title, okText } = this.state
    const { data } = this.props
    const { isMobile } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    return (
      <Modal
        title={title}
        okText={okText}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={e => this.onCancel(e)}
        width="800px">
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="站点编号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPid', {
                  initialValue: data.fPid,
                  rules: [{ required: true, whitespace: true, message: '请输入站点编号！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="站点名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fName', {
                  initialValue: data.fName,
                  rules: [{ required: true, whitespace: true, message: '请输入站点名称！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="所属机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBranchid', {
                  initialValue: data.fBranchid,
                  rules: [{ required: true, whitespace: true, message: '请选择所属机构！' }],
                })(<Organization type="select" treeDefaultExpandAll disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAreaid', {
                  initialValue: data.fAreaid && { label: data.areaname, value: data.fAreaid },
                  rules: [{ required: true, whitespace: true, message: '请选择所属区域！', type: 'object' }],
                })(<StationSelect type="select" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="建设单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBuildCompany', {
                  initialValue: data.fBuildCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入建设单位！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="设计单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDesignCompany', {
                  initialValue: data.fDesignCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="监管单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSuperviseCompany', {
                  initialValue: data.fSuperviseCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="养护单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintainCompany', {
                  initialValue: data.fMaintainCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="站点地址:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddress', {
                  initialValue: data.fAddress,
                  rules: [{ required: true, whitespace: true, message: '请输入站点地址！' }]
                })(<Input.TextArea autosize maxLength="60" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="经度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddressjd', {
                  initialValue: data.fAddressjd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置经度！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="纬度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddresswd', {
                  initialValue: data.fAddresswd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置纬度！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="建设日期:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBuilddate', {
                  initialValue: (data.fBuilddate && data.fBuilddate.indexOf('-') > -1 && moment(data.fBuilddate, 'YYYY-MM-DD')) || undefined,
                  rules: [{  type: 'object', required: true, message: '请输入建设日期！' }]
                })(<DatePicker style={{width: '100%'}} placeholder="" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="负责人编号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fContid', {
                  initialValue: data.fContid,
                  rules: [{ required: true, whitespace: true, message: '请输入负责人编号！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="负责人电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fConttel', {
                  initialValue: data.fConttel,
                  rules: [{ required: true, whitespace: true, message: '请输入负责人电话！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="维护人:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintainid', {
                  initialValue: data.fMaintainid,
                  rules: [{ required: true, whitespace: true, message: '请选择维护人！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="维护人电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintaintel', {
                  initialValue: data.fMaintaintel,
                  rules: [{ required: true, whitespace: true, message: '请输入维护人电话！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="服务户数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSerFamily', {
                  initialValue: data.fSerFamily,
                  rules: [{ required: true, whitespace: true, message: '请输入服务户数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="服务人数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSerPeople', {
                  initialValue: data.fSerPeople,
                  rules: [{ required: true, whitespace: true, message: '请输入服务人数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="工艺类型:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTtype', {
                  initialValue: data.fTtype,
                  rules: [{ required: true, whitespace: true, message: '请选择工艺类型！' }]
                })(<Select disabled={disabled}>
                    {craftList.map( item => 
                        <Select.Option key={item.fId} value={item.fId}>{item.fName}</Select.Option>
                    )}
                </Select>)}
              </Form.Item>
              <Form.Item label="处理水量:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWcount', {
                  initialValue: data.fWcount,
                  rules: [{ required: true, whitespace: true, message: '请输入处理水量！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="管网长度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fClength', {
                  initialValue: data.fClength,
                  rules: [{ required: true, whitespace: true, message: '请输入管网长度！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="窖井个数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWellcount', {
                  initialValue: data.fWellcount,
                  rules: [{ required: true, whitespace: true, message: '请输入窖井个数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="提升井数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPwcount', {
                  initialValue: data.fPwcount,
                  rules: [{ required: true, whitespace: true, message: '请输入提升井数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="湿地个数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWetlandarea', {
                  initialValue: data.fWetlandarea,
                  rules: [{ required: true, whitespace: true, message: '请输入湿地个数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="出水标准:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fEffluent', {
                      initialValue: data.fEffluent,
                      rules: [{ required: true, whitespace: true, message: '请选择出水标准！' }]
                    })(<Select disabled={disabled} showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {
                        standardNameList.map(item => 
                          <Select.Option key={item.fId} value={item.fStandardname}>{item.fStandardname}</Select.Option>
                        )
                      }
                    </Select>)}
                  </Form.Item>
              <Form.Item label="化粪池数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fCesspool', {
                  initialValue: data.fCesspool,
                  rules: [{ required: true, whitespace: true, message: '请输入化粪池数！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="站点二维码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fQrcode', {
                  initialValue: data.fQrcode,
                  rules: [{ required: true, whitespace: true, message: '请选择站点二维码！' }]
                })(<Input maxLength="16" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="关联通讯设备:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fComDeviceid', {
                  initialValue: data.fComDeviceid,
                  rules: [{ required: true, whitespace: true, message: '请选择关联通讯设备！' }]
                })(<DeviceType disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="站点图片:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPhotoOne', {
                  initialValue: data.fPhotoOne,
                  rules: [{ required: true, whitespace: true, message: '请选择站点图片！', type: 'object'}]
                })(
                  <Upload
                    disabled={disabled}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={baseUrl+'//file/upload'}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt=""/> : uploadButton}
                  </Upload>
                )}
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