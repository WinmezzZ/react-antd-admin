import React, { Component } from 'react'
import './upload.scss'
import { getRepositoryTypeList } from '@/api';
import { Col, Row, Form, Input, Select, Upload, Icon, Button, message } from 'antd';
import Breadcrumb from '@/components/breadcrumb/';
import { baseUrl } from '@/api/request.js'
const FormItem = Form.Item;

export default class UploadPage extends Component {
  constructor() {
    super();
    this.state = {
      typeList: [],
      formData: {
        type: '',
      }
    }
  }
  componentDidMount() {
    const { typeName } = this.props.match.params;
    const type = typeName === 'document' ? '0' : '1';
    const { formData } = this.state;
    formData.type = type;
    this.setState({
      formData
    }, () => {
      this.initData();
    })
  }
  async initData() {
    const res = await getRepositoryTypeList({
      type: this.state.formData.type
    });
    this.setState({
      typeList: res.data
    })
  }
  cancel = () => {
    this.props.history.replace('/app/service/respository')
  }
  beforeUpload = (file) => {
    const { type } = this.state.formData;
    const { name, size } = file;
    if (type === '0') {
      const vaildType = name.includes('.xlsx'||'docx'||'wps'||'pdf');
      if (!vaildType) {
        message.error('上传的文档的格式必须为xlsx、docx、wps、pdf其中的一种！');
        return false
      }
    }else if(type === '1') {
      const vaildType = name.includes('.mp4');
      if (!vaildType) {
        message.error('上传的视频的格式必须为mp4！');
        return false
      }
    }
    if (size / 1024 /1024 > 500) {
      this.$message.error('上传的文件的大小不得大于500M！');
      return false
    }
  }
  fileChange = (file) => {
    console.log(file)
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    return (
      <div>
        <Breadcrumb first="服务中心" second="知识库">
          <Button type="primary" onClick={this.cancel}>返回</Button>
        </Breadcrumb>
        <Row type="flex" justify="center" style={{marginTop: '60px'}}>
          <Col xs={24} sm={22} md={19} lg={16} xl={13} xxl={10} className="upload">
            <Form className="upload-form">
              <FormItem {...formItemLayout} label="文件名称:">
                <Input placeholder="请输入文件名称"/>
              </FormItem>
              <FormItem {...formItemLayout} label="文件类型:">
                <Select placeholder="请选择文件类型">
                  {
                    this.state.typeList.map(item => 
                      <Select.Option value={item.typeId} key={item.typeId}>{item.typeName}</Select.Option>
                    )
                  }
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="文件介绍">
                <Input.TextArea rows={4}/>
              </FormItem>
              <FormItem {...formItemLayout} label="文件上传">
                <Upload.Dragger action={`${baseUrl}/upload/file`} beforeUpload={this.beforeUpload} onChange={this.fileChange}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此处以上传</p>
                  <p className="ant-upload-hint">
                  {this.state.formData.type === 0 ?
                       '上传的文档的格式必须为xlsx、docx、wps、pdf其中的一种,且大小不得超过500M。' :
                       '上传的视频的格式必须为mp4,且大小不得超过500M。'}
                  </p>
                </Upload.Dragger>
              </FormItem>
              <FormItem style={{width: '70%', margin: '40px auto 0 auto'}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button type="primary">重置</Button>
                    <style scoped>{`
                      .ant-form-item-children {
                        display: flex; 
                        align-items: center; 
                        justify-content: space-around;
                      }
                    `}</style>
              </FormItem>
              <style>{`
                .ant-form-item {margin-bottom: 16px;}
              `}</style>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
