import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from '@/components/breadcrumb'
import StationSelect from '@/components/stationSelect'
import { getStationByArea, getStandardName, addWater } from '@/api'
import { getTime } from '@/utils'
import './index.scss'
import { Form, Row, Col, Input, Select, Layout, Button, message } from 'antd'

class Water extends Component {
  state = {
    stationList: [],
    standardNameList: [],
  }
  initData = async() => {
    const res = await getStandardName()
    this.setState({
      standardNameList: res.data
    })
  }
  areaSelected = async(data) => {
    const res = await getStationByArea(data.value)
    this.setState({
      stationList: res.listInfo
    })
  }
  submitHandle = () => {
    this.props.form.validateFields(async(err, values) => {
      if(err) return
      await addWater({
        ...values,
        fTime: getTime(new Date(), true)
      })
      message.success('操作成功！')
      this.props.form.resetFields()
      this.setState({
        stationList: []
      })
    })
  }
  componentDidMount() {
    this.initData()
  }
  render() {
    const { stationList, standardNameList } = this.state
    const { width } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Layout className="manage-water">
        <Breadcrumb first="管理平台" second="水质数据录入"/>
        <Layout>
          <Layout.Content>
            <p className="title"><i style={{backgroundImage: `url(${require('@/style/imgs/water_enter.png')})`}}></i>水质数据录入</p>
            <Form className="form" style={{background: width < 1200 && '#fff'}}>
              <Row>
                <Col xxl={10} xl={13} lg={16} md={18} sm={24} xs={24}>
                  <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fAreaid', {
                      rules: [{ type: 'object', required: true, message: '请选择所属区域！' }]
                    })(<StationSelect type="select" onSelect={this.areaSelected}/>)}
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
                  <Form.Item label="出水标准:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fStandardname', {
                      rules: [{ required: true, whitespace: true, message: '请选择出水标准！' }]
                    })(<Select showSearch filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {
                        standardNameList.map(item => 
                          <Select.Option key={item.fId} value={item.fStandardname}>{item.fStandardname}</Select.Option>
                        )
                      }
                    </Select>)}
                  </Form.Item>
                  <Form.Item label="PH:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fPh', {
                      rules: [{ required: true, whitespace: true, message: '请输入PH！' }]
                    })(<Input/>)}
                  </Form.Item>
                  <Form.Item label="Cod:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fCod', {
                      rules: [{ required: true, whitespace: true, message: '请输入Cod！' }]
                    })(<Input addonAfter="(mg/L)"/>)}
                  </Form.Item>
                  <Form.Item label="Bod:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fBod', {
                      rules: [{ required: true, whitespace: true, message: '请输入Bod！' }]
                    })(<Input addonAfter="(mg/L)"/>)}
                  </Form.Item>
                  <Form.Item label="氨氮:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fAd', {
                      rules: [{ required: true, whitespace: true, message: '请输入氨氮！' }]
                    })(<Input addonAfter="(mg/L)"/>)}
                  </Form.Item>
                  <Form.Item label="总磷:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fPhosphorus', {
                      rules: [{ required: true, whitespace: true, message: '请输入总磷！' }]
                    })(<Input addonAfter="(mg/L)"/>)}
                  </Form.Item>
                  <Form.Item label="总氮:" {...formItemLayout} colon={false}>
                    {getFieldDecorator('fNitrogen', {
                      rules: [{ required: true, whitespace: true, message: '请输入总氮！' }]
                    })(<Input addonAfter="(mg/L)"/>)}
                  </Form.Item>
                  <Form.Item style={{textAlign: 'right'}}>
                    <Button type="primary" style={{width: 80}} onClick={this.submitHandle}>保存</Button>
                  </Form.Item>
                </Col>
                <Col>
                  <div></div>
                </Col>
              </Row>
            </Form>  
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps)(Form.create()(Water))