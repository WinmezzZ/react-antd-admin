import React, { Component } from 'react'
import { Row, Col, Layout } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
// import { Map, Marker, InfoWindow } from 'react-amap'
// import { getStationList, getStationStatu } from '@/api'
// import { getCookie } from '@/utils'
// import './index.scss'

class Branch extends Component {
  state = {

  }
  initData = async() => {
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    return (
      <Layout>
        <Breadcrumb first="监控平台" second="地图监控"/>
        <Layout>
          <Layout.Content>
					<Row gutter={12}>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#252F3B'}}>
									<p>污水站总数 </p><span>1111</span>
									</div>	
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#3CC2E9'}}>
									<p>已安装监控</p> <span>233</span>
								</div>
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#5CBD92'}}>
									<p>监控在线</p> <span>233</span>
								</div>
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#364557'}}>
									<p>监控离线</p><span>233</span>
								</div>
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#F3AD3B'}}>
									<p>在线率</p><span>75%</span>
								</div>
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#ED5565'}}>
									<p>故障站点</p><span>233</span>
								</div>
							</Col>
						</Row>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default Branch