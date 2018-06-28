import React, { Component } from 'react';
import './index.scss'
import { Layout, Row, Col } from 'antd'
import { getAreaList } from '@/api';
import Pie from './pie'
import Table from './table'
import Line from './line'
import STable from './sTable'
import Bar from './bar'
import Breadcrumb from '@/components/breadcrumb/'
import Sider from '@/components/stationSelect/'

class Run extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaList: []
    }
  }
  async initData() {
    const res = await getAreaList({
      tradeCode: 'area.selectByPrimaryKey',
      fLevel: 1
    });
    this.setState({
      areaList: res.listInfo
    });
  }
  componentDidMount() {
    this.initData();
  }
  componentWillMount() {

  }
  render() {
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    return (
      <Layout>
        <Breadcrumb first="监控平台" second="运行总揽"/>
        <Layout>
          { !isMobile && <Sider/> }
          <Layout.Content>
            <Row gutter={40}>
              <Col xxl={15} xl={12}lg={12} md={12} sm={24} xs={24}>
                <Pie/>
                <Table/>
              </Col>
              <Col xxl={9} xl={12} lg={12} md={12} sm={24} xs={24} className="flex_cc">
                <Line/>
                <Bar/>
                <span style={{display: 'block', color: '#333', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px'}}>表格</span>
                <STable/>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default Run;