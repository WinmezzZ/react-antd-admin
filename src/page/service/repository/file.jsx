import React, { Component } from 'react'
import { setStore } from '@/utils'
import { Row, Col, Table, Pagination, Button, Divider, Select, Input, Tabs } from 'antd'
import Breadcrumb from '@/components/breadcrumb/'
import { getRepositoryList, getRepositoryTypeList } from '@/api'
const { Column } = Table;

export default class File extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositoryList: [],
      total: null,
      repositoryTypeList: [],
      searchData: {
        type: '0',
        typeId: 0,
        name: '',
        limit: 10,
        pageNum: 1
      }
    }
  }
  
  async initData() {
    const res = await getRepositoryList({
      ...this.state.searchData
    });
    this.setState({
      repositoryList: res.data.list,
      total: res.data.total
    })
  }
  async getRepositoryTypeList() {
    const res = await getRepositoryTypeList({
      type: this.state.searchData.type
    });
    const repositoryTypeList = res.data
    this.setState({ repositoryTypeList });
  }
  componentDidMount() {
    this.initData();
    this.getRepositoryTypeList();
  }
  pageChangeHandle = (pageNum) => {
    const searchData = this.state.searchData;
    searchData.pageNum = pageNum
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  keywordsSeach = (e) => {
    const searchData = this.state.searchData;
    searchData.name = e.target.value;
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  typeChange = (typeId) => {
    const searchData = this.state.searchData;
    searchData.typeId = typeId;
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  fileTypeChange = (type) => {
    const searchData = this.state.searchData;
    searchData.type = type;
    this.setState({ searchData }, () => {
      this.initData();
    })
  }
  uploadHandle = () => {
    const { type } = this.state.searchData;
    const typeName = type === '0' ? 'document' : 'video'
    this.props.history.push({
      pathname: `/app/service/respository/upload/${typeName}`
    })
  }
  videoPlay(item) {
    setStore('data', item);
    this.props.history.replace('/app/service/respository/play');
  }
  render() {
    const { repositoryList, total,repositoryTypeList } = this.state;
    const { limit, pageNum, type } = this.state.searchData;
    return (
      <div className="main">
        <Breadcrumb first="服务中心" second="知识库">
          <Button type="primary" onClick={this.uploadHandle}>上传</Button>
        </Breadcrumb>
        <div className="main-container">
          <Row gutter={16} type="flex" justify="space-between">
              <Col xs={24} sm={12} md={8} lg={7} xl={5} xxl={4} className="mg-v-10">
                <Select
                  style={{width: '100%'}}
                  showSearch
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.typeChange}>
                  {
                    repositoryTypeList.map(item => 
                      <Select.Option value={item.typeId} key={item.typeId}>{item.typeName}</Select.Option>
                    )
                  }
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={7} xl={5} xxl={4} className="mg-v-10">
                <Input.Search onInput={this.keywordsSeach} placeholder="请输入文件名称"/>
              </Col>
          </Row> 
          <Tabs 
            tabBarStyle={{textAlign: 'center', borderBottom: 'none', lineHeight: 120}} 
            size="large" defaultActiveKey={type} onChange={this.fileTypeChange}>
            <Tabs.TabPane tab="文档资料" key="0">
              <Table bordered size="small" rowKey="fileId" pagination={false}
                dataSource={repositoryList} scroll={{ x: 555 }}>
                <Column title="文件" dataIndex="name"/>
                <Column title="格式" dataIndex="typeName"/>
                <Column title="浏览次数" dataIndex="browseTime"/>
                <Column title="下载次数" dataIndex="downLoadTime"/>
                <Column title="操作" width="195px"
                  render={(text, record) => (
                  <span>
                    <Button type="primary" size="small">预览</Button><Divider type="vertical" />
                    <Button type="primary" size="small">下载</Button><Divider type="vertical" />
                    <Button type="danger" size="small">删除</Button>
                  </span>
                )}/>
              </Table>
              <Pagination size="small" showQuickJumper 
                total={total} current={pageNum} pageSize={limit}
                showTotal={(total, range) => `共 ${this.state.total} 条`}
                onChange={this.pageChangeHandle}
              />  
            </Tabs.TabPane>
            <Tabs.TabPane tab="视频资料" key="1">
              <Row gutter={40}>
                {
                  repositoryList.map(item => 
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={item.fileId}>
                      <div className="video-box">
                        <div className="video-bg" style={{backgroundImage: `url(${item.readPath + item.picName})`}}>
                        </div>
                        <div className="video-hot">
                          <span style={{backgroundImage: `url(${require('@/style/imgs/eye1.png')})`}}  className="icon-eye">
                            {item.browseTime}
                          </span>
                          <span style={{backgroundImage: `url(${require('@/style/imgs/down.png')})`}} className="icon-down">
                            {item.downLoadTime}
                          </span>
                        </div>
                        <img src={require('@/style/imgs/play.png')} alt="播放" className="icon-play" onClick={this.videoPlay.bind(this, item)}/>
                        <p className="video-info">
                          <span>{item.name}</span>
                          <img src={require('@/style/imgs/del.png')} alt="删除" className="icon-del"/ > 
                        </p>
                      </div>
                    </Col>
                  ) 
                }
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
