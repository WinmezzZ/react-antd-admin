import React from 'react';
import { Form, Input, Radio, DatePicker, Select, Button, message, Switch, Upload, Icon } from 'ant';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@Form.create()
export default class App extends React.Component {
  state = {
    loading: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success('提交成功！');
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <Form onSubmit={this.handleSubmit} style={{ width: '100%', maxWidth: 400, margin: '0 auto'}}>
        <FormItem
          {...formItemLayout}
          label="姓名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别">
          {getFieldDecorator('sex', {
            initialValue: 0,
            rules: [{ required: true, message: '请选择性别！' }],
          })(
            <RadioGroup>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="出生日期">
          {getFieldDecorator('bornDay', {
            rules: [{ required: true, message: '请选择出生日期！' }],
          })(
            <DatePicker/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="学历">
          {getFieldDecorator('education', {
            rules: [{ required: true, message: '请选择学历！' }],
          })(
            <Select>
              <Option value={0}>小学</Option>
              <Option value={1}>初中</Option>
              <Option value={2}>高中/中专</Option>
              <Option value={3}>大专</Option>
              <Option value={4}>本科</Option>
              <Option value={5}>研究生/硕士</Option>
              <Option value={6}>博士</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="民族">
          {getFieldDecorator('nation', {
            initialValue: '汉族',
            rules: [{ required: true, message: '请输入民族！' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="籍贯">
          {getFieldDecorator('nativePlace', {
            rules: [{ required: true, message: '请输入身份证地址！！' }],
          })(
            <Input.TextArea/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="现居地址">
          {getFieldDecorator('nowPlace', {
            rules: [{ required: true, message: '请输入现居地址！！' }],
          })(
            <Input.TextArea/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone1', {
            rules: [{ required: true, message: '请输入手机号！' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="入职日期">
          {getFieldDecorator('workDay', {
            rules: [{ required: true, message: '请选择入职日期！' }],
          })(
            <DatePicker/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在部门">
          {getFieldDecorator('apartment', {
            rules: [{ required: true, message: '请输入所在部门！' }],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所在职位">
          {getFieldDecorator('role', {
            rules: [{ required: true, message: '请输入所在职位！' }],
          })(
            <Input/>
          )}
        </FormItem> 
        <FormItem
          {...formItemLayout}
          label="在职状态">
          {getFieldDecorator('statu', {
            rules: [{ required: true, message: '请选择在职状态！' }],
          })(
            <Switch checkedChildren="在" unCheckedChildren="离" defaultChecked/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="照片">
          {getFieldDecorator('photo', {
            rules: [{ required: true, message: '请选择照片！' }],
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
