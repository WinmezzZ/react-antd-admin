import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import StationSelect from '@/components/stationSelect/'
import Organization from '@/components/organizationSelect'
import { common, addUser, editUser } from '@/api'
import md5 from 'js-md5'
import moment from 'moment'
import { baseUrl } from '@/api/request'
import { Row, Col, Form, Input, Radio, Switch, Select, DatePicker, Icon, Upload, message } from 'antd'

 class Alert extends Component {
  state = {
     roleList: [],
     disabled: true,
     title: '详情',
     okText: '编辑',
     loading: false,
     imageUrl: ''
  }
  initData = async() => {
    const res = await common({
      tradeCode: 'userrole.selectByPrimaryKeyNickname'
    })
    this.setState({
      roleList: res.listInfo
    })
  }
  componentDidMount() {
    this.initData()
    this.props.data.isAdd ? this.setState({
      disabled: false, title: '添加', okText: '确定'
    }) : this.setState({
      imageUrl: baseUrl + '/iwaterui/station_img/' + this.props.data.photoUrl 
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
      const params = {
        ...values,
        fFlag: values.fFlag ? 0 : 1,
        fPassword: md5(values.fPassword),
        areas: values.areas.map(k => k.value).toString(),
        birthday: values.birthday.format('YYYY-MM-DD'),
        joinTime: values.joinTime.format('YYYY-MM-DD'),
        photoUrl: data.isAdd ? values.photoUrl.file.response.fPic1 : values.photoUrl,
        fPid: values.fPid || data.fPid
      }
      const res = data.fPid ? await editUser(params) : await addUser(params)
      if(res.result === '0') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
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
  render() {
    const { roleList, disabled, title, okText, loading, imageUrl } = this.state
    const { data, size: { isMobile }, form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
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
              <Form.Item label="姓名:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fName', {
                  initialValue: data.fName,
                  rules: [{ required: true, whitespace: true, message: '请输入姓名！' }],
                })(
                  <Input maxLength="10" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="登陆账号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPid', {
                  initialValue: data.fPid,
                  rules: [{ required: true, message: '请输入数字类型的登陆账号！' }],
                })(
                  <Input type="number" maxLength="16" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="密码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPassword', {
                  initialValue: data.fPassword,
                  rules: [{ required: true, whitespace: true, message: '请输入登陆密码！' }],
                })(
                  <Input type="password" maxLength="16" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="所在机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBrno', {
                  initialValue: data.fBrno,
                  rules: [{ required: true, whitespace: true, message: '请选择所在机构！' }],
                })(<Organization type="select" treeDefaultExpandAll disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="权限角色:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fRoleid', {
                  initialValue: data.fRoleid && Number(data.fRoleid),
                  rules: [
                    { required: true, whitespace: true, message: '请选择权限角色！', type: 'number' }
                  ],
                })(<Select disabled={disabled}>
                    {roleList && roleList.map(item =>
                        <Select.Option value={item.fId} key={item.fId}>{item.fName}</Select.Option>
                    )}
                </Select>)}
              </Form.Item>
              <Form.Item label="责任区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('areas', {
                  rules: [{ type: 'array', required: true, whitespace: true, message: '请选择责任区域！' }],
                  initialValue: data.area_id && data.area_id.split(',').map((k, i) => ({value: k, label: data.area_name.split(',')[i]}))
                })(
                    <StationSelect type="select" allowClear multiple disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="联系手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone1', {
                  initialValue: data.fTelephone1,
                  rules: [{ required: true, whitespace: true, message: '请输入联系手机！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="备用手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone2',{
                  initialValue: data.fTelephone2,
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="座机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fGddh',{
                  initialValue: data.fGddh,
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPad',{
                  initialValue: data.fPad,
                })(<Input.TextArea autosize maxLength="50" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="服务标志:" {...formItemLayout} colon={false}>
                {getFieldDecorator('showstate', {
                  initialValue: data.showstate,
                  rules: [
                    { required: true, whitespace: true, message: '请选择服务标志！' }
                  ],
                })(
                  <Radio.Group disabled={disabled}>
                    <Radio value="正常">正常</Radio>
                    <Radio value="请假">请假</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="是否有效:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fFlag', {
                  valuePropName: 'checked',
                  initialValue: data.fFlag === '0' ? true : false,
                  rules: [{ required: true, message: '请选择有效性！' }],
                })(<Switch disabled={disabled}/>)}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="性别:" {...formItemLayout} colon={false}>
                {getFieldDecorator('gender', {
                  initialValue: data.gender,
                  rules: [{ required: true, message: '请选择性别！' }],
                })(<Radio.Group disabled={disabled}>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </Radio.Group>)}
              </Form.Item>
              <Form.Item label="年龄:" {...formItemLayout} colon={false}>
                {getFieldDecorator('age', {
                  initialValue: data.age,
                  rules: [{ required: true, message: '请输入年龄！' }],
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="出生日期:" {...formItemLayout} colon={false}>
                {getFieldDecorator('birthday', {
                  initialValue: data.birthday && moment(data.birthday),
                  rules: [{ required: true, message: '请选择出生日期！' }],
                })(<DatePicker disabled={disabled} style={{width: '100%'}} placeholder=""/>)}
              </Form.Item>
              <Form.Item label="民族:" {...formItemLayout} colon={false}>
                {getFieldDecorator('nation', {
                  initialValue: data.nation,
                  rules: [{ required: true, message: '请输入民族！' }],
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="学历:" {...formItemLayout} colon={false}>
                {getFieldDecorator('education', {
                  initialValue: data.education,
                  rules: [{ required: true, message: '请选择学历！' }],
                })(<Select disabled={disabled}>
                  <Select.Option value="小学">小学</Select.Option>
                  <Select.Option value="初中">初中</Select.Option>
                  <Select.Option value="高中">高中</Select.Option>
                  <Select.Option value="中专">中专</Select.Option>
                  <Select.Option value="专科">专科</Select.Option>
                  <Select.Option value="本科">本科</Select.Option>
                  <Select.Option value="研究生">研究生</Select.Option>
                  <Select.Option value="博士">博士</Select.Option>
                </Select>)}
              </Form.Item>
              <Form.Item label="籍贯:" {...formItemLayout} colon={false}>
                {getFieldDecorator('nativePlace', {
                  initialValue: data.nativePlace,
                  rules: [{ required: true, message: '请输入籍贯！' }],
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="入职时间:" {...formItemLayout} colon={false}>
                {getFieldDecorator('joinTime', {
                  initialValue: data.joinTime && moment(data.joinTime),
                  rules: [{ required: true, message: '请选择入职时间！' }],
                })(<DatePicker disabled={disabled} style={{width: '100%'}} placeholder=""/>)}
              </Form.Item>
              <Form.Item label="QQ:" {...formItemLayout} colon={false}>
                {getFieldDecorator('qq', {
                  initialValue: data.qq,
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="联系地址:" {...formItemLayout} colon={false}>
                {getFieldDecorator('mailAddress', {
                  initialValue: data.mailAddress,
                  rules: [{ required: true, message: '请输入联系地址！' }],
                })(<Input.TextArea maxLength="50" disabled={disabled} autosize/>)}
              </Form.Item>
              <Form.Item label="照片:" {...formItemLayout} colon={false}>
                {getFieldDecorator('photoUrl', {
                  initialValue: data.photoUrl,
                  rules: [{ required: true, message: '请上传照片！' }],
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
                    {imageUrl ? <img src={imageUrl} alt="" width="100%"/> : uploadButton}
                  </Upload>
                )}
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
