import React, { Component } from 'react';
import { addPerson, updatePerson } from '@/api';
import { Row, Col, Form, Input, Radio, Select, Switch, DatePicker, message, Modal } from 'ant';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@Form.create()
export default class App extends Component {
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
    this.props.onClose();
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
        bornDate: values.bornDate && values.bornDate.format('YYYY-MM-DD'),
        workDate: values.workDate && values.workDate.format('YYYY-MM-DD'),
        _id: data._id
      }
      const res = data.isAdd ? await addPerson(params) : await updatePerson(params);
      console.log(res)
      if(res.code === 0) {
        message.success(res.msg);
        this.props.onClose(true);
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  render() {
    const { disabled,title, okText } = this.state
    const { form: { getFieldDecorator }, data } = this.props
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
        width="700px">
          <Form className="form">
            <Row gutter={20}>
            <Col md={12}>
              <FormItem
                {...formItemLayout}
                label="姓名">
                {getFieldDecorator('name', {
                  initialValue: data.name,
                  rules: [{ required: true, message: '请输入用户名！' }],
                })(
                  <Input disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="性别">
                {getFieldDecorator('sex', {
                  initialValue: data.sex || 0,
                  rules: [{ required: true, message: '请选择性别！' }],
                })(
                  <RadioGroup disabled={disabled}>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="出生日期">
                {getFieldDecorator('bornDate', {
                  initialValue: data.bornDate && moment(data.bornDate),
                  rules: [{ required: true, message: '请选择出生日期！' }],
                })(
                  <DatePicker disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="学历">
                {getFieldDecorator('education', {
                  initialValue: data.education,
                  rules: [{ required: true, message: '请选择学历！' }],
                })(
                  <Select disabled={disabled}>
                    <Option value="小学">小学</Option>
                    <Option value="初中">初中</Option>
                    <Option value="高中/中专">高中/中专</Option>
                    <Option value="大专">大专</Option>
                    <Option value="本科">本科</Option>
                    <Option value="研究生/硕士">研究生/硕士</Option>
                    <Option value="博士">博士</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="民族">
                {getFieldDecorator('nation', {
                  initialValue: data.nation || '汉族',
                  rules: [{ required: true, message: '请输入民族！' }],
                })(
                  <Input disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="籍贯">
                {getFieldDecorator('nativePlace', {
                  initialValue: data.nativePlace,
                  rules: [{ required: true, message: '请输入身份证地址！！' }],
                })(
                  <Input.TextArea disabled={disabled}/>
                )}
              </FormItem>
            </Col>
            <Col md={12}>
              <FormItem
                {...formItemLayout}
                label="现居地址">
                {getFieldDecorator('nowPlace', {
                  initialValue: data.nowPlace,
                  rules: [{ required: true, message: '请输入现居地址！！' }],
                })(
                  <Input.TextArea disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号"
              >
                {getFieldDecorator('phone', {
                  initialValue: data.phone,
                  rules: [{ required: true, message: '请输入手机号！' }],
                })(
                  <Input  disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="入职日期">
                {getFieldDecorator('workDate', {
                  initialValue: data.workDate && moment(data.workDate),
                  rules: [{ required: true, message: '请选择入职日期！' }],
                })(
                  <DatePicker disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所在部门">
                {getFieldDecorator('apartment', {
                  initialValue: data.apartment,
                  rules: [{ required: true, message: '请输入所在部门！' }],
                })(
                  <Input disabled={disabled}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所在职位">
                {getFieldDecorator('role', {
                  initialValue: data.role,
                  rules: [{ required: true, message: '请输入所在职位！' }],
                })(
                  <Input disabled={disabled}/>
                )}
              </FormItem> 
              <FormItem
                {...formItemLayout}
                label="在职状态">
                {getFieldDecorator('statu', {
                  initialValue: data.statu,
                  rules: [{ required: true, message: '请选择在职状态！' }],
                })(
                  <Switch disabled={disabled} checkedChildren="在" unCheckedChildren="离" defaultChecked/>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}