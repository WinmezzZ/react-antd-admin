import React from 'react'
import { Row, Col, Layout } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { Map, Marker, InfoWindow } from 'react-amap'
import { getStationList, getStationStatu } from '@/api'
import { getCookie } from '@/utils'

class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			position: {
				longitude: 121.388821,
				latitude: 30.799945
			},
			stationList: [],
			statuList: [],
			infoData: {},
			infoVisible: false
		};
	}
	componentDidMount() {
    //this.initData();
  }
	async initData() {
		let deviceId = '';
		const res = await getStationList({
			tradeCode : 'station.selectByPrimaryKey',
      fUserid : getCookie('userid')
		});
		const stationList = res.listInfo;
		stationList.forEach(item => {
			if (item.fComDeviceid) {
				deviceId += item.fComDeviceid + ',';
			}
			item.infoShow = false;
			item.position = {
				longitude: item.fAddressjd || -1000, 
				latitude: item.fAddresswd || -1000
			}
		});
		const status = await getStationStatu({
			deviceId,
			toList: 'deviceId'
		});
		stationList.forEach(item => {
			let id = item.fComDeviceid
			if (id) {
				item.statu = status.data.filter(key => toString(key.deviceId) === toString(id))[0] || { deviceState: '暂无信息' }
			}else {
				item.statu = { deviceState: '暂无信息' }
			}
		});
		this.setState({
			stationList,
			statuList: status.data
		})
	}
	clickHandle = (infoData) => {
		this.setState({
			infoData,
			infoVisible: true
		})
	}
	closeHandle = () => {
		this.setState({
			infoVisible: false
		})
	}
	getIcon = (item) => {
		let deviceState = item.statu.deviceState;
		if(deviceState === '暂无信息') {
			return require('@/style/imgs/station_normal.png')	
		}else if(deviceState === '全部正常') {
			return require('@/style/imgs/station_ok.png')
		}else {
			return require('@/style/imgs/station_nook.png')
		}
		
	}
	render() {
    const loadingStyle = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const Loading = <div style={loadingStyle}>Loading Map...</div>;
    const { infoData } = this.state;
		return (
				<Layout>
        <Breadcrumb first="管理平台" second="首页"/>
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
									<p>在线率</p><span>233</span>
								</div>
							</Col>
							<Col xxl={4} xl={8}lg={8} md={12} sm={12} xs={24}>
								<div className="station-record" style={{borderColor: '#ED5565'}}>
									<p>故障站点</p><span>233</span>
								</div>
							</Col>
						</Row>
						<div className="map-box">
							<Map
								plugins={['MapType','ToolBar']}
								loading={Loading}
								amapkey={'1dcf1cf6a824292676aba58a05ce853d'}
								zoom={13.9} 
								center={this.state.position}>
								{this.state.stationList.map((item, index) => 
									<Marker 
										key={item.fPid}
										events={{click:() => this.clickHandle(item)}}
										position={item.position}>
										<img src={this.getIcon(item)} alt="logo"/>
									</Marker>
								)}
								<InfoWindow
									position={infoData.position}
									visible={this.state.infoVisible}
									autoMove={true}
									events={{close: this.closeHandle}}>
									<p>{infoData.areaname}</p>
									<p>{infoData.fMaintainCompany}</p>
									<p>{infoData.maintainname}</p>
									<p>{infoData.fPid}</p>
								</InfoWindow>
							</Map>
						</div>
          </Layout.Content>
        </Layout>
      </Layout>
		)
	}
}

export default Index
